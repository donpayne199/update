import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../../redux/user/userSlice.js";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [isProgress, setIsProgress] = useState(false);

  console.log(currentUser._id);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.trunc(progress));
        setIsProgress(true);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, profilePicture: downloadURL }));
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.username);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <>
      <div className="updateform-container">
        <form className="update-form" onSubmit={handleSubmit}>
          <input type="file" className="hideFile" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <div>
            <input type="text" className="updateform-inputs" placeholder={currentUser.username} onChange={handleChange} />
            <p className="center-progress">
              {imageError ? (
                <span className="loading-error">Error uploading image</span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="image-loading-percent">{`Uploading: ${imagePercent}%`}</span>
              ) : imagePercent === 100 ? (
                <span className="upload-successful">Image uploaded successfully</span>
              ) : (
                ""
              )}
            </p>

            <button className="updateform-inputs add-border-on-click" onClick={() => fileRef.current.click()} style={{ textAlign: "left", color: "#808080" }}>
              {!isProgress ? "update image" : " -"}
            </button>

            <input type="text" className="updateform-inputs" id="updateform-inputs" placeholder={currentUser.email} onChange={handleChange} />
          </div>

          <button type="submit" className="update-profile-btn">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;

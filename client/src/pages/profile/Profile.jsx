import { useSelector } from "react-redux";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [profilePage, setProfilePage] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateProfileText, setUpdateProfileText] = useState(false);

  function openProfileUpdate() {
    setProfilePage(false);
    callUpdateForm();
    setUpdateProfileText(true);
  }

  function callUpdateForm() {
    setShowUpdateForm(true);
  }

  return (
    <section>
      {updateProfileText ? <div className="page-title">Update Profile</div> : <div className="page-title">Profile</div>}
      <div className="main-container">
        {profilePage && (
          <>
            <div className="profile-pic-and-school-container">
              <img src={currentUser.profilePic} alt="profile-picture" className="the-profile-pic" />
              <div className="school">{currentUser.school} </div>
              <div className="classOf">{currentUser.classOf}</div>
            </div>
            <div className="profile-info-container">
              <div className="profile-info-btns">
                <div className="profile-info-btn">button 1</div>
                <div className="profile-info-btn">button 2</div>
                <div className="profile-info-btn profile-update" onClick={openProfileUpdate}>
                  update
                </div>
              </div>
            </div>
          </>
        )}
        {showUpdateForm && <UpdateProfile />}
      </div>
    </section>
  );
};
export default Profile;

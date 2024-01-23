import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="sign-in-container">
      <div className="form-outline">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="sign-in">Sign In</h1>
          <input className="login-inputs" type="email" placeholder="email" id="email" onChange={handleChange} />
          <input className="login-inputs" type="password" placeholder="password" id="password" onChange={handleChange} />
          <div className="show-error">
            <p style={{ color: "brown" }}>{error ? error : ""}</p>
          </div>
          <button className="login-btn">{loading ? "happy studies" : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;

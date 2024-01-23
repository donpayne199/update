import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav>
      <div className="navbar" style={currentUser ? { background: "#ccffff" } : { background: "lightgray" }}>
        <h1>Logo</h1>
        <div className="btn-set">
          <Link to="profile">
            {currentUser ? (
              <div className="profile-favorites-btn-set">
                <img src={currentUser.profilePic} alt="profile picture" className="profile-pic" style={{ borderColor: currentUser.profileBtnBorder }} />
              </div>
            ) : (
              <>
                <Link to="/sign-in">
                  <button className="sign-in-btn btn-set" style={currentUser ? { backgroundColor: currentUser.signInBtns } : { backgroundColor: "lightgray", borderColor: "darkgray" }}>
                    Sign in
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="sign-up btn-set" style={currentUser ? { backgroundColor: currentUser.signInBtns } : { backgroundColor: "lightgray", borderColor: "darkgray" }}>
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

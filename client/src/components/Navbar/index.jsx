import "./navBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="navbar-logo">FIREBASE</div>
      <nav className="normal-menu">
        <ul className="navbar-links">
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </>
          {/* )} */}

          {user && user.signUpCompleted ? (
            <>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>

              <li>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
// cument.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const id=localStorage.getItem("id");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    if (localStorage.getItem("Teacher")==="true") {
      setIsTeacher(true);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default behavior of the link

    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(false);
        setIsTeacher(false);
        setUserId(null); // Clear the user ID on logout
        localStorage.removeItem("token");
        localStorage.removeItem("Teacher");
        localStorage.removeItem("id");
        toast.success("Successfully logged out");
        setTimeout(() => {
          navigate("/"); // Redirect after showing toast
        }, 1000); // Wait 1 second before redirecting to ensure toast is shown
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div>
          <nav>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
            <NavLink className="navlink" to="/blog">
              Blog
            </NavLink>
            <NavLink className="navlink" to="/all-courses">
              Courses
            </NavLink>
          </nav>
        </div>
        <div className="image">
          <Link to="/">
            <img className="imageshown" src={Logo} alt="project photo" />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="authentication">
            <Link className="link login" to="/plans">
              Teach on LearnLynx
            </Link>
            {isTeacher ? (
              <Link
                className="link login"
                to={`http://localhost:3001/admin/${id}`}
              >
                Dashboard
              </Link>
            ) : (
              <Link className="link login" to="/my-learnings">
                My Learnings
              </Link>
            )}
            <a href="#" className="link login logout" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          <div className="authentication">
            <Link className="link login" to="/plans">
              Teach on LearnLynx
            </Link>
            <Link className="link signup" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Header;

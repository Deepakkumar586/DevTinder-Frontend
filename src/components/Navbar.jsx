import axios from "axios";
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FaBarsProgress } from "react-icons/fa6";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("loginTime");

    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
      toast.success("Logout successful");
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete your account? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Proceed with account deletion
        await axios.delete(`${BASE_URL}/profile/delete`, {
          withCredentials: true,
        });
        dispatch(removeUser());
        toast.success("Account deleted successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  return (
    <nav className="navbar bg-base-300 fixed top-0 z-10 shadow-lg px-4 py-2 w-full max-w-full">
      <div className="flex justify-between items-center w-full">
        {/* Logo and DevTinder Text with Tinder Icon */}
        <Link className="text-2xl font-bold flex items-center text-white">
          {/* Tinder Icon */}
          <img
            src="https://i.pinimg.com/60x60/e8/c6/21/e8c6214faaff002da5b06a5e6133a57e.jpg"
            alt="Tinder Icon"
            className="w-8 h-8 mr-1 rounded-[50%]"
          />
          SocailSparks
        </Link>

        {/* Feed Button or Login Button */}
        <div className="flex mx-7 text-xl font-bold">
          {user ? (
            <div className="flex gap-2">
              {/* Dropdown for Small Screens */}
              <details className="dropdown lg:hidden">
                <summary className="btn m-1 bg-base-300">
                  <FaBarsProgress className="w-6" />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-lg z-[1] w-40 p-2 shadow">
                  <li>
                    <Link to="/feed" className="font-semibold">
                      Feed
                    </Link>
                  </li>
                  <li>
                    <Link to="/createGroup" className="font-semibold">
                      Create Group
                    </Link>
                  </li>
                  <li>
                    <Link to="/listGroup" className="font-semibold">
                      Group List
                    </Link>
                  </li>
                </ul>
              </details>

              {/* Links for Large Screens */}
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to="/feed"
                  className=" font-semibold hover:underline"
                >
                  Feed
                </Link>
                <Link
                  to="/createGroup"
                  className=" font-semibold hover:underline"
                >
                  Create Group
                </Link>
                <Link
                  to="/listGroup"
                  className=" font-semibold hover:underline"
                >
                  Group List
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/" className="text-white font-bold">
              Login
            </Link>
          )}
        </div>

        {/* User Avatar, Profile Links, and Logout */}
        {user && (
          <div className="flex items-center gap-4 ml-auto">
            {user && user.firstName ? (
              <span className="hidden sm:block text-gray-200">
                Welcome, <strong>{user.firstName}</strong>!
              </span>
            ) : (
              <span className="hidden sm:block text-gray-200">
                Welcome, Guest!
              </span>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user
                        ? user?.photoUrl
                        : "https://thumbs.dreamstime.com/b/professional-business-man-center-tablet-computer-148434325.jpg"
                    }
                    alt="User avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-50"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <i className="fas fa-user-circle"></i>{" "}
                    <p className="font-bold">Profile</p>
                  </Link>
                </li>
                <li>
                  <Link to="/premium" className="flex items-center gap-2">
                    <i className="fas fa-user-friends"></i>{" "}
                    <p className="font-bold">Premium</p>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="flex items-center gap-2">
                    <i className="fas fa-user-friends"></i>{" "}
                    <p className="font-bold">Connections</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="flex items-center text-bold gap-2"
                  >
                    <i className="fas fa-envelope"></i>{" "}
                    <p className="font-bold">Connection Requests</p>
                  </Link>
                </li>
                {user && (
                  <li>
                    <button
                      className="flex items-center gap-2 text-white"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i>{" "}
                      <p className="font-bold">Logout</p>
                    </button>
                    <button
                      className="flex items-center gap-2 text-red-600"
                      onClick={handleDeleteAccount}
                    >
                      <i className="fas fa-trash-alt"></i>{" "}
                      <p className="font-bold">Delete Account</p>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

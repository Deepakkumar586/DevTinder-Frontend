import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { Toaster } from 'react-hot-toast';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("User data: ", response.data.user);
      // Store user data in Redux store or local storage for future use.
      dispatch(addUser(response.data.user));
    } catch (err) {
      // if(err.status === 401){

      // }
      navigate("/login");
      console.error("Error in Body component: ", err);
      // return null; // Return null if error occurred to avoid rendering unwanted content.
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {/* Add this line to show toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
      <Footer />
      {/* Add this line to show toast notifications */}
    </div>
  );
};

export default Body;

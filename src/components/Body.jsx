import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.user)); // Store user data in Redux store
      setLoading(false); // Set loading state to false once user data is fetched
    } catch (err) {
      console.error("Error fetching user: ", err);
      setLoading(false); // Stop loading state even if error occurs
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

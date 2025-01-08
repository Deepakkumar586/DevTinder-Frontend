import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Use toast.promise to show immediate feedback
    const resetPromise = axios.post(
      `${BASE_URL}/profile/forgotPassword`,
      { emailId },
      { withCredentials: true }
    );

    toast.promise(
      resetPromise,
      {
        loading: "Sending reset email...",
        success: "Reset email sent successfully! Check your inbox.",
        error: (error) =>
          error?.response?.data?.message ||
          "Failed to send reset email. Please try again later.",
      },
      {
        duration: 4000, // Adjust duration as needed
      }
    );

    try {
      await resetPromise; // Wait for the promise to resolve
      navigate("/"); // Redirect after successful response
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to reset your password.
        </p>
        <form onSubmit={handleForgotPassword}>
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-all"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

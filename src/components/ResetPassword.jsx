import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../utils/constants";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 1:
        setPasswordStrength("Weak");
        break;
      case 2:
        setPasswordStrength("Fair");
        break;
      case 3:
        setPasswordStrength("Good");
        break;
      case 4:
        setPasswordStrength("Strong");
        break;
      default:
        setPasswordStrength("");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    calculatePasswordStrength(value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (passwordStrength === "Weak" || passwordStrength === "Fair") {
      setError("Password is not strong enough. Please make it stronger.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/resetPassword/${id}/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      );
      toast.success(response.data?.message || "Password reset successfully!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to reset password. Please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full relative"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Reset Password
        </h2>
        <p className="text-gray-600 text-center mb-6">Enter a New Password</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleResetPassword}>
          {/* Password Input */}
          <div className="relative mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password"
              name="password"
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full bg-base-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <p
              className={`text-sm font-semibold text-gray-500  mt-2 ${passwordStrength.toLowerCase()}`}
            >
              Password Strength: <strong>{passwordStrength}</strong>
            </p>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 bg-base-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

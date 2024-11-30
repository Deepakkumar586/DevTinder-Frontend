import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      console.log("Response", response.data.findUser);
      dispatch(addUser(response.data.findUser));
      navigate("/feed");
      toast.success("Login Success")
    } catch (err) {
      setError(err);
      console.error(err);
      toast.error("Failed to login. Please try again.")
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="bg-base-200  p-3 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white-800 mb-2">
          Sign In
        </h2>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 !pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <span className="text-red-600 text-sm">
            {error.response?.data?.message}
          </span>

          <button
            type="submit"
            className="w-full py-2 btn btn-primary text-white rounded-lg font-medium  transition duration-200"
          >
            Sign In
          </button>

          <div className="text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

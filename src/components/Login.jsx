import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogInForm, setisLogInForm] = useState(true);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Password strength calculation
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

  // Handle password input change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    calculatePasswordStrength(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    window.localStorage.setItem('isLoggedIn',true)
    try {
      const endpoint = isLogInForm ? "/login" : "/signup";
      const payload = isLogInForm
        ? { emailId, password }
        : { firstName, lastName, emailId, password };
      const response = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true,
      });

      dispatch(addUser(response.data.findUser));
      if (isLogInForm) {
        navigate("/feed");
        toast.success("Login Success");
      } else {
        navigate("/"); // Navigate to login after successful signup
        toast.success("SignUp Success");
      }
    } catch (err) {
      setError(err);
      toast.error("Failed to process. Please try again.");
    } finally {
      setLoading(false); // Stop loading when the request is done
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 py-8">
      <div className="relative w-full max-w-md bg-base-300 text-white rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform  p-6 space-y-2">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          {isLogInForm ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {!isLogInForm && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 pr-10"
              required
            />
            <span
              className="absolute right-3 top-[38px] z-10 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          {password && (
            <div
              className={`mt-2 text-sm font-medium ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : passwordStrength === "Good"
                  ? "text-yellow-500"
                  : passwordStrength === "Fair"
                  ? "text-orange-500"
                  : "text-red-500"
              } transition duration-300`}
            >
              Password Strength: {passwordStrength}
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm">
              {error.response?.data?.message || "An error occurred."}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white transition duration-200 transform hover:scale-105"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Loading..." : isLogInForm ? "Log In" : "Sign Up"}
          </button>
          <p className="text-sm text-white  mt-4 cursor-pointer hover:underline">
            {" "}
            <Link to="/forget-password">Forget Password</Link>
          </p>
          <p
            onClick={() => setisLogInForm((prev) => !prev)}
            className="text-sm text-blue-400 text-center mt-4 cursor-pointer hover:underline"
          >
            {isLogInForm
              ? "New user? Sign up here."
              : "Already have an account? Log in here."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const loginInitialState = { email: '', password: '' };
  const signupInitialState = { firstName: '', lastName: '', email: '', password: '' };
  const [loginData, setLoginData] = useState(loginInitialState);
  const [signupData, setSignupData] = useState(signupInitialState);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [error, setError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(BASE_URL + "/api/auth/login", { emailId: loginData.email, password: loginData.password }, { withCredentials: true });
      dispatch(addUser(res.data.data))
      toast.success(res.data.message)
      navigation('/')
    }
    catch (error) {

      setError(error.response?.data?.message)

    }
    finally {
      setIsLoading(false);
    }

  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {

      setIsLoading(true);
      const res = await axios.post(BASE_URL + "/api/auth/signup", { firstName: signupData.firstName, lastName: signupData.lastName, emailId: signupData.email, password: signupData.password }, { withCredentials: true });
      toast.success(res.data.message)
      setActiveTab('login')


    }
    catch (error) {

      setSignupError(error.response?.data?.message);
    }
    finally {
      setIsLoading(false);
    }

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-25 p-4"
      style={{ backgroundColor: ' #0B0F14' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl"
        style={{ backgroundColor: '#111827' }}
      >

        <div className="flex mb-8 ">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 font-medium text-lg transition-all duration-300 cursor-pointer ${activeTab === 'login'
              ? 'text-white border-b-2'
              : 'text-gray-400 hover:text-gray-300'
              }`}
            style={{
              borderBottomColor: activeTab === 'login' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'login' ? '#E5E7EB' : '#9CA3AF'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 font-medium text-lg transition-all duration-300 cursor-pointer ${activeTab === 'signup'
              ? 'text-white border-b-2'
              : 'text-gray-400 hover:text-gray-300'
              }`}
            style={{
              borderBottomColor: activeTab === 'signup' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'signup' ? '#E5E7EB' : '#9CA3AF'
            }}
          >
            Sign Up
          </button>
        </div>


        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <Mail size={16} />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 pl-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="you@example.com"
                  required
                />
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="••••••••"
                  required
                />
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} style={{ color: '#9CA3AF' }} />
                  ) : (
                    <Eye size={18} style={{ color: '#9CA3AF' }} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </p>
              </div>
            )}
            <Link to='/forgot-password'>
              <p className='text-purple-500 hover:underline text-right mb-5'>Forgot Password?</p>
            </Link>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: '#8B5CF6' }}
            >

              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Login'
              )}

            </button>
          </form>
        )}


        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <User size={16} />
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 pl-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="john"
                  required
                />
                <User
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <User size={16} />
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 pl-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="doe"
                  required
                />
                <User
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
              </div>
            </div>



            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <Mail size={16} />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 pl-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="you@example.com"
                  required
                />
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  placeholder="••••••••"
                  required
                />
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={18} style={{ color: '#9CA3AF' }} />
                  ) : (
                    <Eye size={18} style={{ color: '#9CA3AF' }} />
                  )}
                </button>
              </div>
            </div>
        
            {signupError && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                            <p className="text-red-500 text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {signupError}
                            </p>
                        </div>
                    )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: '#8B5CF6' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        )}



      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown, 
  Shield, 
  BadgeCheck, 
  Users, 
  LayoutList, 
  User,
  Sparkles
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/authSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const requests = useSelector((state) => state.requests.requests);
  const requestCount = requests?.length || 0;

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsDropdownOpen(false);
    }
  };

  const getNavLinkClass = ({ isActive }) => 
    `relative px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 rounded-full ${
      isActive 
        ? 'text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
    }`;

  const placeholderAvatar = "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg";

  return (
    <nav className="w-full px-6 py-3 fixed top-0 z-[999] bg-[#0D1117]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg shadow-lg group-hover:rotate-3 transition-transform">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              DevTinder<span className="text-purple-500">.</span>
            </span>
          </Link>
        </div>

       
        <div className="flex items-center gap-6">
          {user ? (
            <>
             
              <nav className="hidden md:flex items-center bg-black/20 p-1 rounded-full border border-white/5">
                <ul className="flex gap-1">
                  <li>
                    <NavLink to="/" end className={getNavLinkClass}>
                      <LayoutList size={16} />
                      <span>Feed</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/connections" className={getNavLinkClass}>
                      <Users size={16} />
                      <span>Connections</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/requests" className={getNavLinkClass}>
                      <div className="relative">
                        <UserPlus size={16} />
                        {requestCount > 0 && (
                          <span className="absolute -top-3 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ">
                            {requestCount > 9 ? '9+' : requestCount}
                          </span>
                        )}
                      </div>
                      <span>Requests</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>

             
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="group flex items-center gap-3 pl-1 pr-3 py-1 rounded-full transition-all bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={user.photoUrl || placeholderAvatar}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-purple-500 transition-colors"
                    />
                    {user.isEmailVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full border-2 border-[#0D1117] flex items-center justify-center">
                        <BadgeCheck size={12} className="text-white" />
                      </div>
                    )}
                   
                   
                  </div>
                  
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 text-gray-400 group-hover:text-white ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

               
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl py-2 z-50 bg-[#161B22] border border-white/10 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 mb-1 border-b border-white/5">
                      
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoUrl || placeholderAvatar}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
                          alt="User"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-gray-100 truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.emailId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 space-y-0.5">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={18} className="text-purple-400" />
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>

                     
                      <div className="md:hidden contents">
                        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white" onClick={() => setIsDropdownOpen(false)}>
                          <LayoutList size={18} className="text-gray-400" />
                          <span className="text-sm font-medium">Feed</span>
                        </Link>
                        <Link to="/connections" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white cursor-pointer" onClick={() => setIsDropdownOpen(false)}>
                          <Users size={18} className="text-gray-400" />
                          <span className="text-sm font-medium">Connections</span>
                        </Link>
                        <Link to="/requests" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white cursor-pointer" onClick={() => setIsDropdownOpen(false)}>
                          <div className="relative">
                            <UserPlus size={18} className="text-gray-400" />
                            {requestCount > 0 && (
                              <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                                {requestCount > 9 ? '9+' : requestCount}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium">Requests</span>
                        </Link>
                      </div>

                      {!user.isEmailVerified && (
                        <Link
                          to="/verify-profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all cursor-pointer"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Shield size={18} />
                          <span className="text-sm font-medium">Verify Identity</span>
                        </Link>
                      )}

                      <div className="my-2 h-px bg-white/5 mx-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-all cursor-pointer"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="relative group px-6 py-2 rounded-full font-bold overflow-hidden transition-all duration-300 cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-all"></span>
                <span className="relative flex items-center gap-2 text-white text-sm">
                  <LogIn size={16} />
                  Get Started
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

     
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsDropdownOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Users, Info, Save, Briefcase, Camera } from 'lucide-react';
import UserCard from '../components/UserCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { updateUser } from '../utils/authSlice';


const EditProfile = ({ user }) => {
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    skills: user?.skills || "",
    gender: user?.gender || "",
    age: user.age || null,
    emailId: user?.emailId || "",
    location: user?.location || "",
    photoUrl: user?.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const updateData = {
      age: formData.age,
      gender: formData.gender,
      about: formData.about,
      location: formData.location,
      photoUrl: formData.photoUrl,
      skills: typeof formData.skills === "string"
        ? formData.skills.split(",").map(skill => skill.trim())
        : formData.skills
    };
      const res = await axios.patch(BASE_URL + '/api/update/profile', updateData, { withCredentials: true });
          dispatch(updateUser(res.data.data)); 
      toast.success("Profile updated successfully");

    }
    catch (err) {
      setError(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Failed to update profile")
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-25 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Update your information to connect with other developers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
            <div className="bg-[#161622] rounded-2xl border border-white/10 overflow-hidden">
             
              <div className="p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={formData.photoUrl}
                      alt="Profile"
                      className="w-20 h-20 rounded-xl object-cover border-2 border-purple-600/50"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Camera size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="text"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-2 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>
              </div>

             
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <User size={16} className="text-purple-600" />
                        First Name <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      readOnly
                      required
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="John"
                    />
                  </div>

                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <User size={16} className="text-purple-600" />
                        Last Name <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                       readOnly
                      required
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="Doe"
                    />
                  </div>

                 
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <Mail size={16} className="text-purple-600" />
                        Email <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      readOnly
                      required
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                 
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="text-purple-600" />
                        Location
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="New York, USA"
                    />
                  </div>

                
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple-600" />
                        Age
                      </span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="18"
                      max="100"
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="25"
                    />
                  </div>

                
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <Users size={16} className="text-purple-600" />
                        Gender
                      </span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-600 transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    {/* max-5 */}
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} className="text-purple-600" />
                      Skills <span className="text-red-500 text-xs font-medium">(Separate with commas, max 5) </span> 
                    </p>

                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors"
                    placeholder="React, Node.js, Python, MongoDB"
                  />
                  <p className="text-xs text-[#A0A0B0] mt-1">Separate skills with commas</p>
                </div>

               
                <div className="mt-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    <span className="flex items-center gap-2">
                      <Info size={16} className="text-purple-600" />
                      About
                    </span>
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-white/10 rounded-xl text-white placeholder:text-[#A0A0B0] focus:outline-none focus:border-purple-600 transition-colors resize-none"
                    placeholder="Tell others about yourself, your experience, and what you're looking for..."
                  />
                </div>

                {
                  error && <p className="text-red-500 text-sm mt-2">{error}</p>
                }

              
                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div className="lg:col-span-1">
            <UserCard userData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender || "Male");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills || []);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [wordCount, setWordCount] = useState(
    about ? about.split(" ").length : 0
  );

  useEffect(() => {
    // Simulating an API delay for skeleton loader
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAboutChange = (e) => {
    const text = e.target.value;
    const words = text.split(" ").filter((word) => word.trim().length > 0);
    if (words.length <= 20) {
      setAbout(text);
      setWordCount(words.length);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { photoUrl, about, age, skills, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Failed to update profile!";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row items-center gap-10 justify-center mt-14 px-4 lg:px-8 py-4 overflow-hidden">
        <div className="bg-gray-500 mt-10 animate-pulse h-96 w-full max-w-md rounded-lg"></div>
        <div className="bg-gray-500 mt-10 animate-pulse h-96 w-full max-w-md rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 justify-center mt-14 m-4 px-4 lg:px-8 py-4 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Edit Form Section */}
      <div className="bg-base-300 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center  mb-4 text-indigo-600">
          Edit Profile
        </h2>
        <form className="space-y-2" onSubmit={saveProfile}>
          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium tex-white mb-1">
              Photo URL *
            </label>
            <input
              required
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Age & Gender */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium tex-white mb-1">
                Age *
              </label>
              <input
                required
                type="number"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium tex-white mb-1">
                Gender *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium tex-white mb-1">
              Skills * <span className="text-red-500">Should be 5 Skills</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type a 5 skill and press Enter"
              className="w-full mt-2 px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium tex-white">
              About *
            </label>
            <textarea
              required
              value={about}
              onChange={handleAboutChange}
              className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Tell us about yourself..."
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              {wordCount} / 20 words
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* User Card Section */}
      <UserCard 
        user={{ firstName, lastName, photoUrl, about, gender, age, skills }}
      />
    </div>
  );
};

export default EditProfile;

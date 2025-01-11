import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa"; // For refresh icon

const UserCard = ({ user, onRefresh }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionSent, setIsActionSent] = useState(false); // Track action state

  if (!user) {
    return (
      <div className="bg-gray-800 text-white text-center p-4 rounded-lg">
        User data is not available.
      </div>
    );
  }

  const { _id, firstName, lastName, photoUrl, about, gender, age, skills } = user;

  // Handle API request (send or ignore)
  const handleSendRequest = async (status) => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(removeUserFromFeed(_id)); // Remove user from feed in Redux store
        toast.success(`Request ${status === "interested" ? "sent" : "ignored"} successfully.`); // Show success toast
        setIsActionSent(true); // Disable action buttons

        // Trigger browser refresh
        window.location.reload();
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      toast.error("Failed to send request. Please try again."); // Show error toast
    } finally {
      setIsRefreshing(false); // Stop refreshing indicator
    }
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true); // Start manual refresh
    window.location.reload(); // Trigger browser refresh
    setIsRefreshing(false); // Stop refresh indicator after completion
  };

  return (
    <motion.div
      className="bg-base-300 flex flex-col w-full mt-7 max-w-md rounded-lg shadow-lg overflow-hidden mb-14"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img
          className="h-56 w-full object-fit rounded-t-lg"
          src={photoUrl || "https://via.placeholder.com/150"}
          alt="user"
        />
        {gender && age && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-gray-200 px-3 py-1 text-sm rounded-md">
            <span className="font-semibold">{gender}</span> | <span>Age: {age}</span>
          </div>
        )}
        <button
          onClick={handleManualRefresh}
          className="absolute top-2 right-2 p-1 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800"
        >
          <FaSyncAlt className={isRefreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{firstName} {lastName}</h2>
        <p className="text-gray-400 text-sm mb-4">
          {about || "This user hasn't provided any details yet."}
        </p>

        {skills && skills.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Skills:</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-lg truncate text-center transition-transform transform hover:scale-105"
                  title={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <motion.button
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg mr-2 transition duration-200"
            onClick={() => handleSendRequest("ignored")}
            whileHover={{ scale: 1.05 }}
            disabled={isActionSent} // Disable button after action
          >
            Ignore
          </motion.button>
          <motion.button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg ml-2 transition duration-200"
            onClick={() => handleSendRequest("interested")}
            whileHover={{ scale: 1.05 }}
            disabled={isActionSent} // Disable button after action
          >
            Interested
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;

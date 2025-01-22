import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const getRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/check/group-by-Id/${groupId}`,
          { withCredentials: true }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          setGroup(response.data.group);
          toast.success(response.data.message);
        } else {
          throw new Error(
            response.data.error || "Failed to fetch group details"
          );
        }
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
        toast.error(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-16 text-gray-100 bg-gray-900 min-h-screen">
      {/* Group Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Group Name : {group.name}</h1>
        <p className="text-gray-400 text-lg">Group Decription : {group.description}</p>
        <p className="text-gray-500 mt-2 text-sm">
          Created: {getRelativeTime(group.createdAt)} by {group.createdBy.firstName} {group.createdBy.lastName}
        </p>
      </div>

      {/* Creator Info */}
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <img
          src={group.createdBy.photoUrl}
          alt="Creator"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold text-blue-400">
          {group.createdBy.firstName} {group.createdBy.lastName}
        </h2>
        <p className="text-gray-300 mt-2">{group.createdBy.about}</p>
      </div>

      {/* Members Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Members</h2>
        <div className="grid mb-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.members.map((member) => (
            <div
              key={member.userId._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={member.userId.photoUrl}
                alt="Member"
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-blue-400">
                {member.userId.firstName} {member.userId.lastName}
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                <span className="font-semibold">Role:</span> {member.role}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                <span className="font-semibold">Joined:</span> {getRelativeTime(member.joinedAt)}
              </p>
              <p className="text-gray-300 text-sm mt-1 text-center">
                {member.userId.about}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;

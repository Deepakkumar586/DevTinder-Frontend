import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/check/all-groups`, { withCredentials: true });
        console.log(response)
        if (response.data.success) {
          setGroups(response.data.groups);
          toast.success(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  const handleGroupChat = (groupId,memberId)=>{
    navigate(`/group/chat/${groupId}`)
    // console.log("memberId",memberId);
  }

  return (
    <div className="p-6 mt-16  text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">My Groups</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div
            key={group._id}
            className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-2">{group.name}</h2>
            <p className="text-gray-300 text-sm mb-4">{group.description}</p>
            <p className="text-sm">
              <span className="font-semibold text-gray-400">Created By:</span>{" "}
               { user.firstName === group.createdBy.firstName ? "Me" : `${group.createdBy.firstName} ${group.createdBy.lastName}`}
             </p>
            <p className="text-sm mt-2">
              <span className="font-semibold text-gray-400">Members:</span> {group.members.length}
            </p>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => navigate(`/group/details/${group._id}`)}
            >
              View Details
            </button>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleGroupChat(group._id)}
            >
             chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;

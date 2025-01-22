import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const AddMemberToGroup = () => {
  const { userId } = useParams();
  const [groupName, setGroupName] = useState("");

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  const { firstName, lastName } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${BASE_URL}/add/Member/InGroup/${userId}`,
        { groupName },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      navigate("/listGroup");
    } catch (err) {
      toast.error(err.response?.data?.error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-white text-2xl font-bold mb-6">
          Add Member to Group
        </h2>

        <p className="text-gray-400 mb-4">
          Are you sure you want to add{" "}
          <span className="text-white font-semibold">{`${firstName || ""} ${
            lastName || ""
          }`}</span>{" "}
          to the group?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-300 text-left mb-2"
              htmlFor="groupName"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter the group name"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 px-6 rounded-lg transition-all duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              "Add Member"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberToGroup;

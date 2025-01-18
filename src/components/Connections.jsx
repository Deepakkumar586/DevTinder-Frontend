import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const SkeletonCard = () => (
  <div className="flex flex-col items-center bg-gray-200 animate-pulse shadow-md rounded-xl p-6 space-y-4">
    <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
    <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
    <div className="w-full h-4 bg-gray-300 rounded"></div>
  </div>
);

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Failed to load connections. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  const handleChatClick = (connectionId) => {
    if (!user?.isPremium) {
      navigate(`/not-premium/${connectionId}`);
    } else {
      navigate(`/chat/${connectionId}`);
    }
  };

  if (loading) {
    return (
      <div className="p-6 m-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Connections</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={fetchConnections}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <img
          className="w-48 h-48 mb-4"
          src="/no-connections.svg"
          alt="No Connections Found"
        />
        <p className="text-lg font-semibold text-gray-600 mt-4">
          No connections found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 m-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Connections</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col items-center shadow-xl rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 p-6 transition-transform transform  hover:shadow-2xl  space-y-4"
            >
              <img
                className="w-24 h-24 rounded-full object-cover mb-4"
                src={photoUrl || "/default-avatar.png"}
                alt={`${firstName || "User"}'s avatar`}
              />
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold mb-2 text-gray-50">{`${
                  firstName || "Unknown"
                } ${lastName || ""}`}</h2>
                {age && <p className="text-gray-400">{`Age: ${age}`}</p>}
                {gender && (
                  <p className="text-gray-400">{`Gender: ${gender}`}</p>
                )}
                <p className="text-gray-400 mt-2">
                  {about || "No details provided."}
                </p>
              </div>
              <button
                onClick={() => handleChatClick(_id)}
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Chat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

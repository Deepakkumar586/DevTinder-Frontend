import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const SkeletonCard = () => (
  <div className="flex flex-col items-center bg-gray-300 animate-pulse shadow-lg rounded-lg p-6">
    <div className="w-24 h-24 rounded-full bg-gray-400 mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-400 rounded mb-2"></div>
    <div className="w-1/2 h-4 bg-gray-400 rounded mb-2"></div>
    <div className="w-full h-4 bg-gray-400 rounded"></div>
  </div>
);

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="p-6 m-20">
        <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Render skeleton loaders */}
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
        <button className="btn btn-primary mt-4" onClick={fetchConnections}>
          Retry
        </button>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          className="w-48 h-48"
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
    <div className="p-6 m-20">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={index}
              className="flex flex-col items-center bg-base-300 text-white shadow-lg rounded-lg p-6"
            >
              <img
                className="w-24 h-24 rounded-full object-cover mb-4"
                src={photoUrl || "/default-avatar.png"}
                alt={`${firstName || "User"}'s avatar`}
              />
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">
                  {`${firstName || "Unknown"} ${lastName || ""}`}
                </h2>
                {age && <p className="text-gray-500">{`Age: ${age}`}</p>}
                {gender && (
                  <p className="text-gray-500">{`Gender: ${gender}`}</p>
                )}
                <p className="text-gray-500 mt-2">
                  {about || "No details provided."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const ConnectionRequest = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Track if refresh is happening
  const requests = useSelector((state) => state.request);
  const dispatch = useDispatch();

  // Fetch requests function
  const fetchRequest = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching received requests", err);
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  };

  // Handle accept/reject request
  const handleReviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error handling review request", err);
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequest();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100 text-white">
        <p className="text-xl font-semibold">Loading connection requests...</p>
      </div>
    );
  }

  // Show "No connection requests found" only after all requests are processed
  if (!loading && (!requests || requests.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-gray-300">
        <img
          className="w-48 h-48"
          src="/no-connections.svg"
          alt="No Connections Found"
        />
        <p className="text-lg font-semibold mt-4">No connection requests found.</p>
        {/* Show refresh button only if no requests */}
        <button
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          onClick={handleRefresh}
          disabled={refreshing} // Disable the button when refreshing
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-base-200 text-white min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center mt-14 mb-3">Connection Requests</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId || {};

          return (
            <div
              key={_id}
              className="bg-base-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-200"
            >
              <img
                className="w-20 h-20 rounded-full object-cover mb-4"
                src={photoUrl || "/default-avatar.png"}
                alt={`${firstName || "User"}'s avatar`}
              />
              <h2 className="text-lg font-semibold mb-2">
                {`${firstName || "Unknown"} ${lastName || ""}`}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-400 mb-2">{`Age: ${age}, Gender: ${gender}`}</p>
              )}
              <p className="text-sm mb-6">{about || "No details provided."}</p>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                  onClick={() => handleReviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                  onClick={() => handleReviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Show refresh button when requests are available */}
      <button
        className="mt-6 mb-16 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        onClick={handleRefresh}
        disabled={refreshing} // Disable the button when refreshing
      >
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
};

export default ConnectionRequest;

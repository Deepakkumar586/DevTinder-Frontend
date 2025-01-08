import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConnection } from "../utils/connectionSlice";
import { SetRequest } from "../utils/requestsSlice";
import { BASE_URL } from "../utils/constants";

// Skeleton Loader Component
const SkeletonLoader = ({ width, height }) => {
  return (
    <div
      className="bg-base-200 animate-pulse rounded-lg"
      style={{ width: width, height: height }}
    ></div>
  );
};

const FeedProfile = () => {
  const user = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connection); // Fetch connections count
  const requests = useSelector((state) => state.request); // Fetch requests count
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true); // Set loading to true when fetching
        const connectionsRes = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        const requestsRes = await axios.get(
          `${BASE_URL}/user/request/received`,
          {
            withCredentials: true,
          }
        );

        // Dispatch actions to store the fetched data
        dispatch(setConnection(connectionsRes?.data?.data || []));
        dispatch(SetRequest(requestsRes?.data?.data || []));
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false); // Set loading to false if error occurs
      }
    };

    fetchCounts();
  }, [dispatch]);

  return (
    <div className="p-4 lg:p-6 m-4 lg:m-16 bg-base-100 rounded-lg text-white shadow-lg">
      {/* Profile Picture Section */}
      <div className="flex items-center gap-4 relative">
        {loading ? (
          // Skeleton loader for profile picture
          <SkeletonLoader width="80px" height="80px" />
        ) : (
          <>
            <img
              src={user?.photoUrl || "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            {/* Green circle to show online status */}
            <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full sm:h-2  sm:w-2 md:h-6 md:w-6 lg:h-4 lg:w-4"></span>
          </>
        )}

        <div className="flex flex-col">
          {loading ? (
            <>
              <SkeletonLoader width="200px" height="20px" className="mb-2" />
              <SkeletonLoader width="150px" height="15px" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {user?.firstName || "First Name"}{" "}
                {user?.lastName || "Last Name"}
              </h1>
              <p className="text-sm text-gray-400">
                {user?.emailId || "Email Address"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* About Section */}
      <p className="mt-4 text-sm text-gray-300">
        {loading ? (
          <SkeletonLoader width="100%" height="50px" />
        ) : (
          user?.about ||
          "This user hasn't shared anything about themselves yet."
        )}
      </p>

      {/* Skills Section */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">
          {loading ? <SkeletonLoader width="80px" height="16px" /> : "Skills:"}
        </h3>
        {loading ? (
          <SkeletonLoader width="100%" height="30px" />
        ) : user?.skills && user.skills.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No skills listed.</p>
        )}
      </div>

      {/* Connections and Requests Count */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        {loading ? (
          <>
            <SkeletonLoader width="100%" height="20px" />
            <SkeletonLoader width="100%" height="20px" />
          </>
        ) : (
          <>
            <p className="flex justify-between text-sm">
              <span className="text-gray-500">👥 Friends :</span>
              <span className="text-indigo-400 font-semibold">
                {connections?.length || 0}
              </span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-gray-500">📩 Friends Requests :</span>
              <span className="text-indigo-400 font-semibold">
                {requests?.length || 0}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedProfile;

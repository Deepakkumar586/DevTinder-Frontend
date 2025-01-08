import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import FeedProfile from "./FeedProfile";

const Feed = () => {
  const feed = useSelector((state) => state.feed || []); // Ensure feed defaults to an empty array
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data || [])); // Ensure data is an array
    } catch (err) {
      console.error("Error fetching feed", err);
    }
  };

  // Only fetch feed if it's empty
  useEffect(() => {
    if (feed.length === 0) {
      getFeed();
    }
  }, [dispatch, feed.length]);

  // Handle refreshing the feed
  const handleRefresh = () => {
    if (feed.length === 0) {
      getFeed(); // Fetch feed only if it's empty
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center min-h-screen bg-base-100 py-6">
      {/* Feed Profile (Always Visible) */}
      <div className="w-full  max-w-lg rounded-lg p-6 shadow-sm">
        <FeedProfile />
      </div>

      {/* Feed or No Feed Message */}
      {feed && feed.length === 0 ? (
        <div className="flex flex-col  justify-center sm:mb-[-90px] items-center rounded-lg p-16 shadow-lg mt-[-100px] max-w-lg w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-2.204 2.204m-1.41 0a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243zm4.95-5.95a6 6 0 00-8.486 8.486m9.193 2.836A9 9 0 118.636 3.757m12.728 0a9 9 0 010 12.728"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white mb-2">No Feed Available</h1>
          <p className="text-center text-gray-500 mb-6">
            There are no users in your feed right now. Try refreshing later or
            updating your preferences.
          </p>
          <button
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            onClick={handleRefresh}
          >
            Refresh Feed
          </button>
        </div>
      ) : (
        // Show UserCard if feed is available
        feed.length > 0 && (
          <div className="mt-6 w-full mb-2 max-w-lg rounded-lg p-2">
            <UserCard user={feed[0]} />
          </div>
        )
      )}
    </div>
  );
};

export default Feed;

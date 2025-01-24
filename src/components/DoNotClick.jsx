import React from "react";
import { Link } from "react-router-dom";

const DoNotClick = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-800 text-white px-4 py-6 overflow-auto">
      <div className="text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Oops! 🛑 You Don’t Have Premium Access
        </h1>
        <p className="text-base sm:text-lg mb-4">
          It seems like you’re missing out on some of the coolest features of this website. Without premium access, you can’t enjoy features like:
        </p>
        <ul className="list-disc text-left space-y-2 text-sm sm:text-base ml-4 mb-6">
          <li>🔐 Exclusive group chats with top users</li>
          <li>📧 Access to private messaging</li>
          <li>🎉 Fun and interactive group activities</li>
          <li>✨ Many more premium perks!</li>
        </ul>
        <p className="mb-6 text-base sm:text-lg">
          Don’t miss the party! Upgrade now and unlock the magic ✨ or... keep wondering what’s behind the curtain. 😜
        </p>
        <Link
          to="/premium"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 sm:px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Upgrade to Premium 🚀
        </Link>
        <p className="mt-4 text-xs sm:text-sm">
          Just here to explore? No worries, you can still{" "}
          <Link to="/" className="text-blue-300 underline">
            go back to the homepage
          </Link>{" "}
          and enjoy the free features. 🙂
        </p>
      </div>
    </div>
  );
};

export default DoNotClick;

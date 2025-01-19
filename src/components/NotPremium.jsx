import React from "react";
import { useSelector } from "react-redux";

const NotPremium = ({ firstName, lastName }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 p-4">
      <div className="text-center w-full max-w-2xl p-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-4">
          Oops! 😕 Mr. {firstName} has not taken Premium yet, so the chat is
          disabled. Once {firstName} gets Premium, the chat will be enabled.{" "}
        </h2>
        {user.isPremium && (
          <>
            <h2 className="text-base sm:text-lg md:text-xl text-gray-400 mb-4">
              Great news, Mr. {user.firstName}! You’ve got Premium! 🚀
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
              You now have access to all pro chats! 💬✨ Get ready to unlock the
              best conversations with the coolest people out there!
            </p>
            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-50 mb-4">
              You can also chat with other brilliant minds in your connections!
              💬👥 Ready to spark some epic conversations and make those
              connections shine even brighter?
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
              Don’t forget to enjoy your VIP status! You’re officially a part of
              the elite chatters’ club. 🏆😎
            </p>
          </>
        )}

        <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-4">
          For assistance, contact us at:{" "}
          <span className="font-semibold text-blue-600">
            deeparyan345@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotPremium;

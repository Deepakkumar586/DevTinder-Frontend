import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Picker from "emoji-picker-react";

const GroupChat = () => {
  const MESSAGE_LIMIT = 50;
  const { groupId } = useParams();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null);
  const messageEndRef = useRef(null);

  // Fetch group messages when the component mounts or groupId changes
  useEffect(() => {
    const fetchGroupMessages = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/group-messages/${groupId}`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load group messages");
      }
    };

    fetchGroupMessages();
  }, [groupId]);

  useEffect(() => {
    const fetchGroupById = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/check/group-by-Id/${groupId}`,
          { withCredentials: true }
        );
        setGroupInfo(response.data.group);
      } catch (error) {
        toast.error("Failed to load group information");
      }
    };
    fetchGroupById();
  }, []);

  // Initialize socket connection and set up event listeners
  useEffect(() => {
    const socketInstance = createSocketConnection();
    setSocket(socketInstance);

    socketInstance.emit("joinGroupChat", {
      groupId,
      userId: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    socketInstance.on("groupMessageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [groupId, user]);

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        groupId,
        senderId: {
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
        },
        text: newMessage,
        createdAt: new Date().toISOString(),
      };

      socket.emit("groupmessage", messageData);
      setNewMessage("");
    }
  };

  // Format message timestamp
  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      return "Just now";
    }

    const now = new Date();
    const messageTime = new Date(timestamp);
    const timeDiff = now - messageTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length >= MESSAGE_LIMIT) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 via-blue-700 to-teal-700">
        <div className="w-full max-w-3xl p-6 mx-auto border border-gray-700 rounded-lg shadow-lg bg-gray-800">
          <div className="text-center space-y-4 text-gray-300">
            <h1 className="text-3xl font-bold text-red-500">
              Message Limit Reached!
            </h1>
            <p>
              You’ve hit the{" "}
              <span className="font-semibold">{MESSAGE_LIMIT}</span> message
              limit—who knew you had so much to say? 🛑
            </p>
            <p>
              To keep the conversation going, consider upgrading to unlimited
              chat privileges. 🚀
            </p>
            <p>
              Or take a break—maybe it’s time for coffee. ☕ We’ll be here when
              you’re ready!
            </p>
            <p>
              Need help? Reach out at{" "}
              <a
                className="text-blue-400 underline"
                href="mailto:deeparyan345@gmail.com"
              >
                deeparyan345@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 mb-10 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <motion.div
        className="overflow-y-auto max-h-[70vh] bg-gray-800 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
            <div className="flex flex-col space-y-2 sm:space-y-1">
              <h1 className="font-semibold text-gray-500 text-xl sm:text-3xl">
                Group Name :{" "}
                <span className="text-lg sm:text-3xl text-gray-500">
                  {groupInfo?.name}
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-500 font-semibold">
                Group Description :{" "}
                <span className="text-sm sm:text-2xl text-gray-500 font-semibold">
                  {groupInfo?.description}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-semibold">
                Created by{" "}
                {user.firstName === groupInfo?.createdBy?.firstName
                  ? "You"
                  : `${groupInfo?.createdBy?.firstName} ${groupInfo?.createdBy?.lastName}`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 sm:space-x-4 mt-1 sm:mt-0">
              <button className="bg-gray-800 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition-all duration-200">
                <i className="fa fa-phone"></i> {/* Icon for call */}
              </button>
              <button className="bg-gray-800 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition-all duration-200">
                <i className="fa fa-video"></i> {/* Icon for video */}
              </button>
              <button className="bg-gray-800 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition-all duration-200">
                <i className="fa fa-info-circle"></i>{" "}
                {/* Icon for group info */}
              </button>
            </div>
          </div>

          {/* Members Section */}
          <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Members
            </h2>
            <div className="flex flex-wrap gap-4">
              {groupInfo?.members?.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-blue-500 text-white flex justify-center items-center">
                    <img
                      src={member.userId.photoUrl}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white text-xs sm:text-base">
                    {member.userId.firstName} {member.userId.lastName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {messages.map((message) => {
          const isUserMessage = user._id === message.senderId._id;
          return (
            <motion.div
              key={message._id || Math.random()}
              className={`chat ${isUserMessage ? "chat-end" : "chat-start"} ${
                isUserMessage ? "text-right" : "text-left"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-semibold">{message?.senderId?.firstName}</p>
              <div
                className={`chat-bubble ${
                  isUserMessage
                    ? "bg-gradient-to-r from-blue-500 to-teal-500"
                    : "bg-gray-700"
                } text-white`}
              >
                <div>{message.text || "No message content"}</div>
              </div>
              <div>
                <time className="text-gray-400 text-sm font-serif">
                  {message.createdAt
                    ? formatTime(message.createdAt)
                    : "Unknown time"}
                </time>
              </div>
            </motion.div>
          );
        })}
        <div ref={messageEndRef}></div>
      </motion.div>

      <div className="flex items-center gap-2 mt-1 mb-2 p-4 bg-gray-800 border-t border-gray-700 rounded-lg">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 rounded-lg p-2 text-white bg-gray-700 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
        >
          😊
        </button>
        {emojiPickerVisible && (
          <div className="absolute bottom-16 left-0 right-0 z-50 mx-auto w-[90%] md:w-[50%] lg:w-[30%] bg-gray-700 rounded-lg shadow-lg p-4">
            <Picker
              onEmojiClick={(emoji) => {
                setNewMessage((prev) => prev + emoji.emoji);
                setEmojiPickerVisible(false);
              }}
              pickerStyle={{
                width: "100%",
                height: "300px",
              }}
            />
          </div>
        )}
        <button
          onClick={handleSendMessage}
          className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:bg-gradient-to-l"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;

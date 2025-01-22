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
  const { groupId } = useParams();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
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
        senderId: user?._id,
        username: `${user.firstName} ${user.lastName}`,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };

      socket.emit("groupmessage", messageData);
      setMessages((prev) => [...prev, messageData]); // Update UI with the new message
      setNewMessage(""); // Clear input field
    }
  };

  // Format message timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInMilliseconds = now - messageDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths =
      now.getMonth() - messageDate.getMonth() +
      12 * (now.getFullYear() - messageDate.getFullYear());

    if (diffInDays === 0) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (diffInDays === 1) {
      return "1 day ago";
    }
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
    if (diffInMonths < 1) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }
    if (diffInMonths === 1) {
      return "1 month ago";
    }
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mt-5 mb-10 mx-auto p-4 bg-gray-900 text-white">
      <div className="overflow-y-auto h-[70vh]">
        {messages.map((message) => {
          const isUserMessage = user._id === message.senderId._id; // Corrected message check
          return (
            <motion.div
              key={message._id}
              className={`chat ${isUserMessage ? "chat-end" : "chat-start"} ${
                isUserMessage ? "text-right" : "text-left"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-semibold">
                {message.senderId.firstName}
              </p>
              <div className="chat-header"></div>
              <div
                className={`chat-bubble ${
                  isUserMessage ? "bg-blue-500" : "bg-gray-700"
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
      </div>

      <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded-lg p-2 text-white bg-gray-700 focus:outline-none"
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
                setNewMessage((prev) => prev + emoji.emoji); // Add emoji to message
                setEmojiPickerVisible(false); // Close emoji picker
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
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;

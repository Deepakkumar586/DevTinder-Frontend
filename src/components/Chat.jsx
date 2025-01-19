import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NotPremium from "./NotPremium";

const Spinner = () => (
  <div className="flex justify-center mt-64 items-center h-full">
    <div className="loader text-white text-2xl">Loading...</div>
  </div>
);

const Chat = () => {
  const MESSAGE_LIMIT = 100;
  const { targetUserId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [color, setColor] = useState("bg-blue-500"); // Default color
  const [typingStatus, setTypingStatus] = useState({
    sender: false,
    receiver: false,
  });
  const typingTimeoutRef = useRef(null);
  const messageEndRef = useRef(null);
  const [isFriend, setIsFriend] = useState(false);
  const [loading, setLoading] = useState({
    chat: false,
    userInfo: false,
    connectionStatus: false,
  });

  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      return "Invalid Time"; // If timestamp is invalid
    }

    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const fetchChat = async () => {
    setLoading((prev) => ({ ...prev, chat: true }));
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chats = response?.data?.chat?.messages.map((msg) => ({
        _id: msg._id,
        firstName: msg.senderId?.firstName || "Unknown",
        color: msg.color,
        text: msg.text || "",
        createdAt: msg.createdAt,
      }));
      setMessages(chats);
    } catch (error) {
      console.error("Error fetching chat:", error);
    } finally {
      setLoading((prev) => ({ ...prev, chat: false }));
    }
  };

  const fetchTargetUserInfo = async () => {
    setLoading((prev) => ({ ...prev, userInfo: true }));
    try {
      const response = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
        withCredentials: true,
      });

      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching target user info:", error);
    } finally {
      setLoading((prev) => ({ ...prev, userInfo: false }));
    }
  };

  const fetchConnectionStatus = async () => {
    setLoading((prev) => ({ ...prev, connectionStatus: true }));
    try {
      const response = await axios.get(
        `${BASE_URL}/user/connections/${targetUserId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data?.data?.status === "accepted") {
        setIsFriend(true);
      }
    } catch (error) {
      console.error("Error fetching connection status:", error.message);
      toast.error("Failed to fetch connection status.");
    } finally {
      setLoading((prev) => ({ ...prev, connectionStatus: false }));
    }
  };

  useEffect(() => {
    fetchChat();
    fetchTargetUserInfo();
    fetchConnectionStatus();
  }, []);

  useEffect(() => {
    const socketConnection = createSocketConnection();
    setSocket(socketConnection);

    socketConnection.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketConnection.on("messageReceived", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketConnection.on("typing", ({ userId, isTyping }) => {
      if (userId === targetUserId) {
        setTypingStatus((prev) => ({ ...prev, receiver: isTyping }));
      } else if (userId === userId) {
        setTypingStatus((prev) => ({ ...prev, sender: isTyping }));
      }
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    if (socket) {
      socket.emit("typing", {
        userId: userId,
        targetUserId: targetUserId,
        isTyping: Boolean(value),
      });

      clearTimeout(typingTimeoutRef.current);
      if (value) {
        typingTimeoutRef.current = setTimeout(() => {
          socket.emit("typing", {
            userId: userId,
            targetUserId: targetUserId,
            isTyping: false,
          });
        }, 10000); // Stop typing after 10 seconds of inactivity
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        _id: new Date().getTime().toString(),
        firstName: user.firstName,
        text: newMessage.trim(),
        userId,
        targetUserId,
        createdAt: new Date().toISOString(),
        color,
      };

      socket.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);

      setNewMessage("");
      socket.emit("typing", false);
    }
  };

  if (messages.length >= MESSAGE_LIMIT) {
    return (
      <div className="mt-20  w-full max-w-4xl mx-auto border border-gray-300 mb-20 rounded-lg shadow-lg h-[80vh] flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Message Limit Reached!
          </h1>
          <p className="text-white mt-4">
            You’ve hit the limit of {MESSAGE_LIMIT} messages. Contact support at{" "}
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
    );
  }

  return (
    <>
      {loading.chat || loading.userInfo || loading.connectionStatus ? (
        <Spinner />
      ) : userInfo?.data?.isPremium ? (
        <div className="mt-20  mb-20 w-full max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg h-[80vh] flex flex-col bg-gray-800">
          <div className="flex items-center p-4 bg-gray-700">
            <img
              src={userInfo.data.photoUrl}
              alt={userInfo.data.firstName}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-white text-lg font-bold">
                {userInfo.data.firstName + " " + userInfo.data.lastName}
              </h2>
              <p>{userInfo.data.about}</p>
            </div>
          </div>

          {isFriend ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isUserMessage = user.firstName === message.firstName;
                  return (
                    <motion.div
                      key={message._id}
                      className={`chat ${
                        isUserMessage ? "chat-end" : "chat-start"
                      } ${isUserMessage ? "text-right" : "text-left"}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="font-semibold">{message.firstName}</p>
                      <div className="chat-header"></div>
                      <div className={`chat-bubble ${color} text-white`}>
                        <div>{message.text}</div>
                      </div>
                      <div>
                        <time className=" text-gray-400 text-sm font-serif">
                          {formatTime(message.createdAt)}
                        </time>
                      </div>
                    </motion.div>
                  );
                })}
                {(typingStatus.sender || typingStatus.receiver) && (
                  <div className="chat chat-start">
                    <div className="chat-bubble text-white bg-green-700 typing-animation">
                      Typing...
                    </div>
                  </div>
                )}
                <div ref={messageEndRef}></div>
              </div>

              <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
                <input
                  value={newMessage}
                  onChange={handleTyping}
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
                  <Picker
                    onEmojiClick={(emoji) =>
                      setNewMessage((prev) => prev + emoji.emoji)
                    }
                  />
                )}
                <button
                  onClick={sendMessage}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>

              <div className="p-4 flex space-x-2">
                {[
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-red-500",
                  "bg-purple-500",
                  "bg-pink-500",
                ].map((colorOption) => (
                  <button
                    key={colorOption}
                    onClick={() => setColor(colorOption)}
                    className={`${colorOption} w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform`}
                  ></button>
                ))}
              </div>
            </>
          ) : (
            <div className=" w-3/4 flex flex-col ml-10  justify-center mt-3  font-serif  text-center text-white text-lg font-semibold p-4 rounded-xl shadow-xl bg-gradient-to-r from-gray-600 to-gray-800 space-y-4">
              <p>🚫 Oops! You can’t chat with this user yet.</p>
              <p>
                💬 Chat is unlocked once you’re friends! Send a request and
                start the convo.
              </p>
              <p>
                😄 "No friendship, no chat. It's like pizza without cheese!"
              </p>
              <p>
                🌈 Meanwhile, feel free to send a message to someone else or
                just chill and vibe! ✌️
              </p>
            </div>
          )}
        </div>
      ) : (
        <NotPremium
          firstName={userInfo?.data?.firstName}
          lastName={userInfo?.data?.lastName}
        />
      )}
    </>
  );
};

export default Chat;

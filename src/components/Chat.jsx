import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CreateSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const location = useLocation();
  // console.log(">>", location.pathname);
  const user = useSelector((store) => store.user);
  // console.log("user:", user);
  const userId = user?.user?._id;
  // console.log("me:", userId);
  const { targetUserId } = useParams();
  // console.log("targetUserId:", targetUserId);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      // console.log("res::", chat.data?.messages);

      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg.senderId?.firstName,
          lastName: msg.senderId?.lastName,
          text: msg.text,
          sentTime: msg.createdAt,
        };
      });
      // console.log("chatMsg", chatMessages);

      setMessages(chatMessages);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  //page loads connect to the server
  useEffect(() => {
    if (!userId) {
      return;
    }
    socketRef.current = CreateSocketConnection();

    socketRef.current.on("connect", () => {
      // console.log("Socket connected:", socketRef.current.id);
      setIsConnected(true);

      //connect to the server
      socketRef.current.emit("joinChat", {
        firstName: user?.user?.firstName,
        userId,
        targetUserId,
      });
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
    });

    //listen messageRecieved event
    socketRef.current.on(
      "messageReceived",
      ({ firstName, lastName, text, sentTime }) => {
        console.log(">>", "recieved: ", firstName + ": ", text, sentTime);
        setMessages((messages) => [
          ...messages,
          { firstName, lastName, text, sentTime },
        ]);
      },
    );

    return () => {
      socketRef.current.off("messageRecieved"); //prevents duplicate listeners
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    //who is sending message
    // to whome we sending the message
    //what is the message
    // const socket = CreateSocketConnection();
    if (!socketRef.current) {
      // console.log("Socket not connected yet");
      return;
    }

    socketRef.current.emit("sendMessage", {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // // optimistically add the sent message to UI immediately
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     firstName: user?.user?.firstName,
    //     lastName: user?.user?.lastName,
    //     text: newMessage,
    //     sentTime: new Date().toISOString(),
    //   },
    // ]);

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };
  const formatTime = (isoString) => {
    if (!isoString) return ""; // ✅ prevent crash

    // console.log("ff", isoString); // 2026-03-18T21:25:51.788Z
    // const date = new Date(isoString);
    // return date.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   hour12: true,
    // });
    const date = new Date(isoString);
    const now = new Date();

    //NOrmalize both dates to remove time for comparison
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOFMessageDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffInMs = startOfToday - startOFMessageDay;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    //Today
    if (diffInDays === 0) {
      return timeFormatter.format(date);
    }

    //yesterday
    if (diffInDays === 1) {
      return `Yesterday, ${timeFormatter.format(date)}`;
    }
    //older messages
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: now.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    });
    return `${dateFormatter.format(date)},${timeFormatter.format(date)} `;
  };

  return (
    <div
      className="w-3/4 sm:w-1/2 mx-auto border border-gray-600  sm:m-5 mx-0 my-0 sm:mx-auto 
        h-[calc(100dvh-8rem)] sm:h-[70vh] flex flex-col overflow-hidden"
    >
      <h1 className="p-4 text-lg font-semibold border-b border-gray-400 flex-shrink-0">
        Chat <span></span>
      </h1>
      {/* <div className="chat chat-start"> */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
        {messages.map((msg, index) => {
          // console.log("user", user);
          const isMe =
            user?.firstName || user?.user?.firstName === msg.firstName;
          // console.log("map", msg);
          return (
            <div
              key={index}
              className={"chat " + (isMe ? "chat-end" : "chat-start")}
            >
              <div className="chat-header text-xs sm:text-sm">
                {`${msg.firstName}`}
                <time className="text-xs opacity-50 ml-1">
                  {" "}
                  {formatTime(msg.sentTime)}
                </time>
              </div>
              <div
                className={`chat-bubble text-sm sm:text-base max-w-[70vw] sm:max-w-xs break-words
                          ${
                            isMe
                              ? "bg-gradient-to-r from-blue-600 to-cyan-400"
                              : "bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-600"
                          }`}
              >
                {msg.text}{" "}
              </div>
              <div className="chat-footer opacity-50 text-xs"> Seen</div>
            </div>
          );
        })}
        {/* invisible anchor at the bottom */}
        <div ref={bottomRef} />
      </div>

      <div className="p-2 sm:p-2 border-t border-gray-600 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type here"
          className="flex-1 border border-gray-500 text-white rounded p-2 text-sm sm:text-base bg-pink-500/30 focus:outline-none focus:border-gray-300"
        />
        <button
          onClick={sendMessage}
          // disabled={!socketRef.current}
          disabled={!isConnected}
          className="btn btn-success btn-sm text-xl flex-shrink-0 
             px-2 py-2 rounded-xl font-semibold tracking-wide
             shadow-lg shadow-green-500/30
             hover:scale-105 hover:shadow-green-500/50
             active:scale-95
             transition-all duration-200 ease-in-out
             border-2 border-yellow-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

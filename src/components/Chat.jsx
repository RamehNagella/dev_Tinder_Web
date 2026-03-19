import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  // console.log("user:", user);
  const userId = user?.user?._id;
  // console.log("me:", userId);
  const { targetUserId } = useParams();
  // console.log("targetUserId:", targetUserId);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
  }, []);

  //page loads connect to the server
  useEffect(() => {
    if (!userId) {
      return;
    }
    //connect to the server
    const socket = CreateSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.user?.firstName,
      userId,
      targetUserId,
    });
    //listen messageRecieved event
    socket.on("messageRecieved", ({ firstName, lastName, text }) => {
      // console.log(">>", "recieved: ", firstName + ": ", text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    //who is sending message
    // to whome we sending the message
    //what is the message
    const socket = CreateSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  const formatTime = (isoString) => {
    if (!isoString) return ""; // ✅ prevent crash

    console.log("ff", isoString); // 2026-03-18T21:25:51.788Z
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
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-400">Chat</h1>
      {/* <div className="chat chat-start"> */}
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user?.user?.firstName === msg.firstName
                  ? "chat-end "
                  : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}`}
                <time className="text-xs opacity-50">
                  {" "}
                  {formatTime(msg.sentTime)}
                </time>
              </div>
              <div className="chat-bubble">{msg.text} </div>
              <div className="chat-footer opacity-50"> Seen</div>
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type here"
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-success">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

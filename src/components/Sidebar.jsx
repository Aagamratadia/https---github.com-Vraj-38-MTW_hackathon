"use client";

import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdHistory, MdSettings } from "react-icons/md";
import "./Sidebar.css"; // Ensure you style it properly

const Sidebar = ({ setIsHistoryOpen, setMessages }) => {
  const handleClearChat = () => {
    setMessages([{ role: "bot", text: "Hello! How can I assist you today?" }]);
  };

  return (
    <div className="w-64 h-full flex flex-col bg-gray-100 p-4 shadow-md">
      {/* Sidebar Title */}
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Chat Menu
      </h2>

      {/* Clear Chat Button */}
      <button
        className="flex items-center p-3 mb-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        onClick={handleClearChat}
      >
        <IoTrashOutline className="mr-2 text-lg" /> Clear Chat
      </button>

      {/* Chat History Button */}
      <button
        className="flex items-center p-3 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => setIsHistoryOpen(true)}
      >
        <MdHistory className="mr-2 text-lg" /> Chat History
      </button>

      {/* Settings Button */}
      <button className="flex items-center p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
        <MdSettings className="mr-2 text-lg" /> Settings
      </button>
    </div>
  );
};

export default Sidebar;

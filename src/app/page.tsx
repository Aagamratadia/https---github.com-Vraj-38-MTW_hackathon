"use client";

import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";
import ChatHistory from "../components/ChatHistory";

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I assist you today?" },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setIsHistoryOpen={setIsHistoryOpen} setMessages={setMessages} />
      <ChatBox />
      {isHistoryOpen && <ChatHistory setIsHistoryOpen={setIsHistoryOpen} />}
    </div>
  );
}

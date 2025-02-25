"use client";

import React from "react";
import "./ChatHistory.css"; // Add appropriate styling

const chatHistory = [
  { title: "What is AI?", messages: ["AI stands for Artificial Intelligence."] },
  { title: "How does AI work?", messages: ["AI works by learning patterns from data."] },
  { title: "Write an email template.", messages: ["Dear [Name],\nHope you are doing well..."] },
];

const ChatHistory = ({ setIsHistoryOpen }) => {
  return (
    <div className="history-modal">
      <div className="history-content">
        <h3>Chat History</h3>
        <ul>
          {chatHistory.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong>
              <p>{item.messages}</p>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={() => setIsHistoryOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default ChatHistory;

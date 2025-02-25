"use client";

import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdUploadFile } from "react-icons/md";
import axios from "axios";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { role: "user", text: input }]);

  try {
    const response = await fetch("http://127.0.0.1:8000/ask/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }), // Correct JSON format
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
  } catch (error) {
    console.error("Fetch error:", error);
    setMessages((prev) => [...prev, { role: "bot", text: "Error fetching response!" }]);
  }

  setInput("");
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setMessages((prev) => [
        ...prev,
        { role: "user", text: `Uploaded file: ${uploadedFile.name}` },
      ]);

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: "Processing your document..." }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-white shadow-lg rounded-lg">
      <div className="chat-header text-lg font-semibold mb-4 text-center">Legal PDF Chatbot</div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-5 py-3 rounded-lg text-lg shadow-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none text-right"
                  : "bg-gray-300 text-gray-900 rounded-bl-none text-left"
              }`}
              style={{ maxWidth: "75%" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input & File Upload */}
      <div className="flex items-center border-t pt-3 px-3 bg-white shadow-sm space-x-2">
        <input
          type="file"
          className="hidden"
          id="fileUpload"
          accept=".pdf"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="fileUpload"
          className="p-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition-all flex items-center"
        >
          <MdUploadFile size={24} />
        </label>
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg w-full bg-gray-100"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <BiSend size={24} />
        </button>
      </div>

      {/* Display uploaded file name */}
      {file && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          Uploaded: <span className="font-semibold">{file.name}</span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

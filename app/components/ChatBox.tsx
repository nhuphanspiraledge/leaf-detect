"use client";

import { useState } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className="bg-primary/80 hover:bg-primary transition-colors text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg cursor-pointer"
        >
          💬
        </div>
      ) : (
        <div className="h-[500px] w-[350px] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
            <p className="font-semibold">Chat with us</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white cursor-pointer font-bold"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet.</p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-blue-100 px-3 py-2 rounded-lg max-w-[80%] self-end text-sm"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-300 px-4 py-2 bg-white flex gap-2 items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-primary/80 cursor-pointer hover:bg-primary text-white text-sm px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

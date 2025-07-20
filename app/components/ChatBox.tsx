"use client";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useMyContext } from "../Provider";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const { chatHistories, sendChat, isChatting } = useMyContext();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
    sendChat(input);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useLayoutEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistories]);

  //   clr mockMess if sent
  useEffect(() => {
    if (!chatHistories || chatHistories.history.length === 0) return;
    const latestReply = chatHistories.history[chatHistories.history.length - 1];
    if (messages.length > 0 && latestReply.message === messages[0]) {
      setMessages([]);
    }
  }, [chatHistories]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className="bg-primary/80 hover:bg-primary transition-colors text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg cursor-pointer"
        >
          💬
        </div>
      ) : (
        <div className="h-[500px] w-[350px] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
            <p className="font-semibold">Chat with us</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white cursor-pointer font-bold"
            >
              ×
            </button>
          </div>

          <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2 bg-gray-50">
            {chatHistories?.history.length === 0 && messages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet.</p>
            ) : (
              <>
                {chatHistories?.history.map((msg, i) => (
                  <div key={`history-${i}`} className="flex flex-col gap-1">
                    <div className="flex justify-end">
                      <div className="bg-blue-100 px-3 py-2 rounded-lg max-w-[80%] text-sm">
                        {msg.message}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-200 px-3 py-2 rounded-lg max-w-[80%] text-sm">
                        {msg.reply}
                      </div>
                    </div>
                  </div>
                ))}
                {/* mock message just sent */}
                {messages.map((msg, i) => (
                  <div key={`pending-${i}`} className="flex justify-end">
                    <div className="bg-blue-100 px-3 py-2 rounded-lg max-w-[80%] text-sm">
                      {msg}
                    </div>
                  </div>
                ))}
              </>
            )}
            <div ref={bottomRef} />
            {isChatting && (
              <div className="flex items-center gap-1 pl-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* input */}
          <div className="border-t border-gray-300 px-4 py-2 bg-white flex gap-2 items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                !isChatting && e.key === "Enter" && handleSend()
              }
            />
            <button
              onClick={handleSend}
              disabled={isChatting}
              className="bg-primary/80 disabled:bg-primary/50 hover:cursor-pointer hover:bg-primary text-white text-sm px-4 py-2 rounded-lg"
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

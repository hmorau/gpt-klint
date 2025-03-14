
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages, { Message } from "./ChatMessages";
import "./ChatApp.css";
const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: idCounter, text, sender },
    ]);
    setIdCounter((prev) => prev + 1);
  };
  const handleSend = (userMessage: string) => {
    addMessage(userMessage, "user");
    setTimeout(() => {
      addMessage("Réponse pour : " + userMessage, "bot");
    }, 1000);
  };
  return (
    <div className="chat-container">
      {messages.length === 0 && (
        <div className="chat-greeting">
          Comment puis-je vous aider ?
        </div>
      )}
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};
export default ChatApp;
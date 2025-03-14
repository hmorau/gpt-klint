import React from "react";
import "./ChatMessages.css";
export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}
interface ChatMessagesProps {
  messages: Message[];
}
const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-item ${msg.sender === "user" ? "message-user" : "message-bot"}`}
        >
          <div className="message-bubble">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};
export default ChatMessages;
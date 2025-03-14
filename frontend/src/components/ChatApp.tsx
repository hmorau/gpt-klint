import React, { useState, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages, { Message } from "./ChatMessages";
import "./ChatApp.css";
import { askQuestion } from "../services/chatService"

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const idCounterRef = useRef<number>(0);
  const addMessage = (text: string, sender: "user" | "bot") => {
    const id = idCounterRef.current;
    setMessages((prevMessages) => [...prevMessages, { id, text, sender }]);
    idCounterRef.current += 1;
  };
  const handleSend = async (userMessage: string) => {
    // Afficher le message de l'utilisateur immédiatement
    addMessage(userMessage, "user");
    try {
      // Utilise le service pour récupérer la réponse
      const answer = await askQuestion(userMessage);
      addMessage(answer, "bot");
    } catch (error) {
      console.error(error);
      addMessage("Erreur lors de la récupération de la réponse depuis le serveur.", "bot");
    }
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
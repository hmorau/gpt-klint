import React, { useState } from "react"; 
import "./ChatInput.css"; 
interface ChatInputProps { 
  onSend: (message: string) => void; 
} 
const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => { 
  const [message, setMessage] = useState(""); 
  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (message.trim() !== "") { 
      onSend(message); 
      setMessage(""); 
    } 
  }; 
  return ( 
    <form className="chat-input-form" onSubmit={handleSubmit}> 
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Tapez un message..." 
        className="chat-input-input" 
      /> 
      <button type="submit" className="chat-input-button"> 
        Envoyer 
      </button> 
    </form> 
  ); 
}; 
export default ChatInput; 
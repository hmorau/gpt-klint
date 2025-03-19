import React, { useState, useRef } from "react";
import "./ChatInput.css";
interface ChatInputProps {
  // La fonction onSend reçoit le message et éventuellement un fichier
  onSend: (message: string, file?: File) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Autoriser l'envoi si le message n'est pas vide ou s'il y a un fichier
    if (message.trim() !== "" || selectedFile) {
      onSend(message, selectedFile || undefined);
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
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
      <div className="chat-input-button-row">
        {/* Bouton pour joindre un document */}
        <div className="chat-input-file">
          {/* Input type file caché */}
          <input
            type="file"
            id="fileUpload"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="file-upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Joindre un document
          </button>
          {selectedFile && (
            <span className="file-name">{selectedFile.name}</span>
          )}
        </div>
        {/* Bouton d'envoi */}
        <button type="submit" className="chat-input-button">
          Envoyer
        </button>
      </div>
    </form>
  );
};
export default ChatInput;
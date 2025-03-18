import React, { useEffect, useState } from "react";
import { getConversations, Conversation } from "../services/conversationService"; // Ajustez le chemin selon l'emplacement du service
const Conversations: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    // Récupération des conversations dès le montage du composant
    getConversations()
      .then((data) => setConversations(data))
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des conversations.");
      });
  }, []);
  // Fonction appelée lors du clic sur un sujet de conversation
  const handleClick = (conversation: Conversation) => {
    console.log("Conversation sélectionnée :", conversation);
    // Vous pouvez ajouter ici une redirection ou afficher les détails de la conversation
  };
  if (error) {
    return <div>{error}</div>;
  }
  if (conversations.length === 0) {
    return <div>Aucune conversation trouvée.</div>;
  }
  return (
    <div>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => handleClick(conversation)}
            style={{
              cursor: "pointer",
            }}
          >
            {conversation.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Conversations;
export interface Conversation {
  id: string;
  subject: string;
  messages?: Message[];
}
export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const apiUrl = import.meta.env.VITE_API_URL;

export const getConversations = async (): Promise<Conversation[]> => {
  if (!apiUrl) {
    throw new Error("L'URL de l'API n'est pas définie.");
  }
  const response = await fetch(`${apiUrl}/api/conversations`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des conversations.");
  }
  const conversations: Conversation[] = await response.json();
  return conversations;
};

// Fonction pour supprimer une conversation en fonction de son id
export const deleteConversation = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/api/conversations/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error("Erreur lors de la suppression de la conversation :", response.statusText);
    throw new Error("Erreur lors de la suppression de la conversation");
  }
};


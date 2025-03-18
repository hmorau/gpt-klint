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
export const getConversations = async (): Promise<Conversation[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
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
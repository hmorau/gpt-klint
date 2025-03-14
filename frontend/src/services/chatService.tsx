// src/services/chatService.ts
export const askQuestion = async (question: string): Promise<string> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
  }
  const response = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la communication avec le serveur");
  }
  const data = await response.json();
  return data.answer;
};
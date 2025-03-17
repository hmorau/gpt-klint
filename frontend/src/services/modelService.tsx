// src/services/modelService.ts
export const selectModel = async (modelId: string): Promise<void> => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }
    const response = await fetch(`${apiUrl}/api/select-model`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modelId }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la communication avec le serveur");
    }
  };
// userService.ts
export interface User {
    oid: string;
    name: string;
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
  }

  export const getCurrentUser = async (): Promise<User> => {
    const response = await fetch(`${apiUrl}/api/user`, {
      method: "GET",
      headers: {
      //  // Transmettez ici le token de test si nécessaire
        "X-Ms-Token-Aad-Access-Token": "test2"
      }
    });
    
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations utilisateur");
    }
    return response.json();
  };
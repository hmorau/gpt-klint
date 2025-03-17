// AIModelSelector.tsx
import React, { useState, useEffect } from 'react';
import "./AIModelSelector.css";
import { selectModel } from '../services/modelService';
interface AIModel {
  id: string;
  name: string;
}
interface AIModelSelectorProps {
  models: AIModel[];
}
const AIModelSelector: React.FC<AIModelSelectorProps> = ({ models }) => {
  // Déterminer le modèle par défaut en cherchant si le modèle "model1" existe dans la liste
  const defaultModelId = models.find(model => model.id === "model1")?.id || '';
  const [selectedModel, setSelectedModel] = useState<string>(defaultModelId);
  // Appel initial pour notifier le backend de la sélection du modèle par défaut
  useEffect(() => {
    if (defaultModelId) {
      const sendSelectedModel = async (modelId: string) => {
        try {
          await selectModel(modelId);
        } catch (error) {
          console.error("Erreur lors de l'envoi de la requête :", error);
        }
      };
      sendSelectedModel(defaultModelId);
    }
  }, [defaultModelId]);
  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);
    try {
      await selectModel(modelId);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };
  return (
    <select value={selectedModel} onChange={handleSelectChange}>
      <option value="" disabled>
        Sélectionnez un modèle
      </option>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  );
};
export default AIModelSelector;
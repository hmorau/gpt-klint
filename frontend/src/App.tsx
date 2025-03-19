import React, { useState, useEffect } from "react";
import ChatApp from "./components/ChatApp";
import Sidebar from "./components/SideBar";
import AIModelSelector from "./components/AIModelSelector";
import { getCurrentUser, User } from "./services/userService";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const models = [
  { id: "model1", name: "Modèle 1" },
  { id: "model2", name: "Modèle 2" },
  { id: "model3", name: "Modèle 3" },
];

function App() {
  const [userName, setUserName] = useState("Chargement...");
  useEffect(() => {
    getCurrentUser()
      .then((user: User) => setUserName(user.name))
      .catch(() => setUserName("Utilisateur inconnu"));
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar userName={userName} />
        <AIModelSelector models={models} />
        <Routes>
          <Route path="/" element={<ChatApp />} />
          <Route path="/conversation/:conversationId" element={<ChatApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
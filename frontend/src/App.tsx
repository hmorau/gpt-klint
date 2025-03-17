import React, { useState } from "react";
import "./App.css";
import ChatApp from "./components/ChatApp";
import Sidebar from "./components/SideBar";
import AIModelSelector from "./components/AIModelSelector";

const models = [
  { id: 'model1', name: 'Modèle 1' },
  { id: 'model2', name: 'Modèle 2' },
  { id: 'model3', name: 'Modèle 3' }
];

function App() {

  return (
    <div className="App">
      <div className="content-container">
        <div className="main-content">
        <AIModelSelector models={models} />
        <ChatApp />
          <Sidebar />
          
        </div>
      </div>
    </div>
  );
}
export default App;
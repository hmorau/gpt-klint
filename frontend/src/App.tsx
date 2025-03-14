import React, { useState } from "react";
import "./App.css";
import ChatApp from "./components/ChatApp";
import Sidebar from "./components/SideBar";
function App() {

  return (
    <div className="App">
      <div className="content-container">
        <div className="main-content">
        <ChatApp />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
export default App;
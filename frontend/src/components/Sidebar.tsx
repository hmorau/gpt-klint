import React, { useState } from "react";
import "./Sidebar.css";
import Conversations from "./Conversations"; // Assurez-vous que le chemin est correct
interface SidebarProps {
  userName: string;
}
const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
  // État pour savoir si la sidebar est repliée ou non
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Fonction de bascule de l'état
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Bouton de bascule */}
      <div className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </div>
      {/* Contenu de la sidebar, masqué si la sidebar est repliée */}
      {!isCollapsed && (
        <div className="sidebar-content">
          <h3>{userName}</h3>
          {/* Affichage du composant Conversations */}
          <div className="conversations-container">
            <h4>Conversations</h4>
            <Conversations />
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
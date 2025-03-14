import React, { useState } from "react";
import "./Sidebar.css";
const Sidebar: React.FC = () => {
  // Etat pour savoir si la sidebar est repliée ou non
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Fonction de bascule de l'état
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
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
          <h3>Menu</h3>
          <ul>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Paramètres</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
import React from "react";
import "./header.css";

function Header({ mode, toggleMode }) {
  return (
    <header>
      <div className="mode-toggle-button" onClick={toggleMode}>
        <span className={mode === "light" ? "icon sun-icon" : "icon moon-icon"} />
        <div className={`toggle ${mode}`}>
          <div className="toggle-circle" />
        </div>
        <span className={mode === "light" ? "icon sun" : "icon moon"} />

      </div>
    </header>
  );
}

export default Header;

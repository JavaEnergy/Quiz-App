import React from "react";
import "./header.css";

function Header({ mode, toggleMode }) {
  return (
    <header>
      <button onClick={toggleMode}>
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
}

export default Header;

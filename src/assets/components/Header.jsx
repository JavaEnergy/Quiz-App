import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import HtmlLogo from "../images/icon-html.svg";
import CssLogo from "../images/icon-css.svg";
import AccessibilityLogo from "../images/icon-accessibility.svg";
import JavascriptLogo from "../images/icon-js.svg";
function Header({ mode, toggleMode }) {
  const location = useLocation();
  let logo;

  console.log("Current Path:", location.pathname); // Debugging line

  switch (location.pathname.toLowerCase()) {
    case "/quiz/html":
      logo = <img src={HtmlLogo} alt="HTML Logo" />;
      break;
    case "/quiz/css":
      logo = <img src={CssLogo} alt="CSS Logo" />;
      break;
    case "/quiz/accessibility":
      logo = <img src={AccessibilityLogo} alt="Accessibility Logo" />;
      break;
    case "/quiz/javascript":
      logo = <img src={JavascriptLogo} alt="Javascript Logo" />;
      break;
    default:
      logo = null; // Or set a default logo
      break;
  }

  return (
    <header className="header">
      {logo && <div className="logo-container">{logo}</div>}
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
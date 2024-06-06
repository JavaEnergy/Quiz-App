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
  let logoText;

  console.log("Current Path:", location.pathname); // Debugging line

  switch (location.pathname.toLowerCase()) {
    case "/quiz/html":
      console.log("Matched Path: /quiz/html");
      logo = <img src={HtmlLogo} alt="HTML Logo" />;
      logoText = "HTML";
      break;
    case "/quiz/css":
      console.log("Matched Path: /quiz/css");
      logo = <img src={CssLogo} alt="CSS Logo" />;
      logoText = "CSS";
      break;
    case "/quiz/accessibility":
      console.log("Matched Path: /quiz/accessibility");
      logo = <img src={AccessibilityLogo} alt="Accessibility Logo" />;
      logoText = "Accessibility";
      break;
    case "/quiz/javascript":
      console.log("Matched Path: /quiz/javascript");
      logo = <img src={JavascriptLogo} alt="JavaScript Logo" />;
      logoText = "JavaScript";
      break;
    default:
      console.log("No Matching Path");
      logo = null; // Or set a default logo
      logoText = "";
      break;
  }

  return (
    <header className={`header ${logo ? 'header-with-logo' : ''}`}>
      {logo && <div className="logo-container">{logo}<span className="logo-text">{logoText}</span></div>}
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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import Header from "./assets/components/Header";
import Home from "./pages/Home/Home";
import Html from "./pages/html/Html";
import Css from "./pages/css/Css";
import Accessibility from "./pages/accessibility/Accessibility";
import Javascript from "./pages/JS/Javascript";
import "./App.css";

const App = () => {
  const { mode, toggleMode } = useThemeStore();
  return (
    <div className={`background ${mode === "light" ? "light-mode" : "dark-mode"}`}>
      <Header mode={mode} toggleMode={toggleMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="quiz/HTML" element={<Html />} />
          <Route path="quiz/Css" element={<Css />} />
          <Route path="quiz/Accessibility" element={<Accessibility />} />
          <Route path="quiz/Javascript" element={<Javascript />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

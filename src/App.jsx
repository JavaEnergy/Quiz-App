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
      <Router>
        <Header mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="quiz/html" element={<Html />} />
          <Route path="quiz/css" element={<Css />} />
          <Route path="quiz/accessibility" element={<Accessibility />} />
          <Route path="quiz/javascript" element={<Javascript />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

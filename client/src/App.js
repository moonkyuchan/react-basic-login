import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

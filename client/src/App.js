import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Navbar from "./components/views/NavBar/NavBar";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

//내가 알던 react-router-dom 아닌데....?
// Switch 는 사라지고 Routes
// component 대신 element={<exxxxxxxx />}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

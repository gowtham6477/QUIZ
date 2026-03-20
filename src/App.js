import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizSelectionPage from "./pages/QuizSelectionPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/admin/AdminPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz-selection" element={<QuizSelectionPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
  <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
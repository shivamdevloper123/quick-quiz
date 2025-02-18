// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import History from "./pages/History";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/quiz" element={<QuizPage />} />
                    <Route exact path="/history" element={<History />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

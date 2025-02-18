import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ fontSize: "2.5rem" }}>Welcome to the Interactive Quiz Platform</h1>
            <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
                Test your knowledge with our interactive quizzes and track your progress!
            </p>
            
            <div style={{ marginTop: "30px" }}>
                <Link to="/quiz" style={{ padding: "10px 20px", fontSize: "1rem", margin: "0 10px", background: "blue", color: "white", borderRadius: "5px", textDecoration: "none" }}>Start Quiz</Link>
                <Link to="/history" style={{ padding: "10px 20px", fontSize: "1rem", margin: "0 10px", background: "gray", color: "white", borderRadius: "5px", textDecoration: "none" }}>View History</Link>
            </div>
        </div>
    );
};

export default Home;

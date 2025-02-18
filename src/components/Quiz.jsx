import React, { useState } from "react";
import { multipleChoiceQuestions } from "../utils/QuizData/multipleChoiceQuestions.js";
import { fillInTheBlankQuestions } from "../utils/QuizData/fillInTheBlankQuestions.js";

const Quiz = ({ currentIndex, onNextQuestion, updateScore }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    // Determine if the current question is multiple choice
    const isMultipleChoice = currentIndex < multipleChoiceQuestions.length;
    // Get the current question based on the index
    const currentQuestion = isMultipleChoice
        ? multipleChoiceQuestions[currentIndex]
        : fillInTheBlankQuestions[currentIndex - multipleChoiceQuestions.length];

    // Check if the current question is a fill-in-the-blank type
    const isFillInTheBlank = !currentQuestion.options;

    // Handle the answer submission
    const handleAnswer = (answer) => {
        if (!answer) return; // Prevent undefined errors

        // Extract the first letter of the selected option
        let userAnswer = answer.split(".")[0].trim(); // Extracts "B" from "B. Mercury"
        let correctAnswer = currentQuestion.answer.trim(); // No need to convert since it's already stored as "B", "C", etc.

        // Check if the user's answer is correct
        if (userAnswer === correctAnswer) {
            setFeedback("✅ Correct!");
            updateScore((prevScore) => prevScore + 1); // Correct way to update score
        } else {
            setFeedback("❌ Wrong!");
        }

        // Reset feedback and selected answer after a delay, then move to the next question
        setTimeout(() => {
            setFeedback("");
            setSelectedAnswer(""); // Reset input
            onNextQuestion();
        }, 1000);
    };

    return (
        <div className="quiz-container text-center">
            <h2>{currentQuestion.question}</h2>

            {/* Render fill-in-the-blank question */}
            {isFillInTheBlank ? (
                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        placeholder="Type your answer"
                    />
                    <button
                        onClick={() => handleAnswer(selectedAnswer)}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                // Render multiple-choice question with responsive grid
                <div className="mt-5">
                    <div className="row justify-content-center">
                        {currentQuestion.options.map((option, index) => (
                            <div
                                className="col-12 col-sm-6 col-md-5 col-lg-3 mb-3"
                                key={index}
                            >
                                <button
                                    onClick={() => handleAnswer(option)}
                                    className="btn btn-outline-primary w-75"
                                    style={{ padding: "7.5px", margin: "0 auto" }}
                                >
                                    {option}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <p className="mt-3">{feedback}</p>
        </div>
    );
};

export default Quiz;

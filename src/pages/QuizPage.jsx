import React, { useState } from "react"; 
import { multipleChoiceQuestions } from "../utils/QuizData/multipleChoiceQuestions.js";
import { fillInTheBlankQuestions } from "../utils/QuizData/fillInTheBlankQuestions.js";
import { answerKey } from "../utils/AnswerKey";
import { saveQuizResult } from "../utils/storage";
import Quiz from "../components/Quiz";
import Timer from "../components/Timer";

const QuizPage = () => {
  // State variables to manage quiz progress, score, and visibility of the answer key
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Calculate total number of questions by combining multiple-choice and fill-in-the-blank questions
  const totalQuestions =
    multipleChoiceQuestions.length + fillInTheBlankQuestions.length;

  // Determine whether the current question is from multiple-choice or fill-in-the-blank set
  const currentQuestionSet =
    currentIndex < multipleChoiceQuestions.length
      ? multipleChoiceQuestions
      : fillInTheBlankQuestions;

  // Function to handle quiz completion and save the final score
  const handleQuizCompletion = () => {
    saveQuizResult(score); // Save score to local storage
    setQuizCompleted(true); // Mark quiz as completed
  };

  // Function to navigate to the next question
  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      handleQuizCompletion(); // Complete quiz if last question is reached
    }
  };

  // Function to handle when the timer runs out
  const handleTimeUp = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      handleQuizCompletion(); // Complete quiz if no questions are left
    }
  };

  // Function to update the score based on correct answers
  const updateScore = (newScore) => {
    setScore(newScore);
  };

  // Toggle visibility of the answer key
  const handleShowAnswerKey = () => {
    setShowAnswerKey((prevState) => !prevState);
  };

  // Restart quiz: reset all states to initial values
  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setShowAnswerKey(false);
  };

  // Function to validate user's answer against the correct answer
  const validateAnswer = (userAnswer, correctAnswer) => {
    return userAnswer.trim() === correctAnswer.trim();
  };

  // Function to confirm and submit the quiz before completion
  const handleSubmitTest = () => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the quiz?"
    );
    if (confirmSubmit) {
      handleQuizCompletion();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "2.5rem" }}>Quiz Time!</h1>
      <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
        Answer the questions and test your knowledge.
      </p>

      {/* If quiz is not completed, show the quiz and timer */}
      {!quizCompleted ? (
        <>
          <Timer duration={300} onTimeUp={handleTimeUp} />
          <Quiz
            currentIndex={currentIndex}
            onNextQuestion={handleNextQuestion}
            updateScore={updateScore}
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionSet={currentQuestionSet}
            validateAnswer={validateAnswer}
          />
          <button
            onClick={handleSubmitTest}
            className="btn btn-warning mt-4"
            style={{ padding: "10px 20px" }}
          >
            Submit Test
          </button>
        </>
      ) : (
        // Display final score and answer key after quiz completion
        <>
          <h2>Congratulations! You've completed the quiz.</h2>
          <div
            className="card mt-4"
            style={{ width: "18rem", margin: "0 auto" }}
          >
            <div className="card-body">
              <h5 className="card-title">Your Final Score</h5>
              <p className="card-text">
                You scored {score} out of {totalQuestions}
              </p>
            </div>
          </div>

          {/* Button to toggle answer key visibility */}
          <button
            onClick={handleShowAnswerKey}
            className="btn btn-primary mt-4"
            style={{ padding: "10px 20px" }}
          >
            {showAnswerKey ? "Hide Answer Key" : "Answer Key"}
          </button>

          {/* Show answer key if the user chooses to view it */}
          {showAnswerKey && (
            <div
              className="mt-4"
              style={{
                textAlign: "left",
                maxWidth: "800px",
                margin: "0 auto",
                wordWrap: "break-word",
              }}
            >
              <h3>Answer Key</h3>
              <ul className="list-group">
                {answerKey.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{item.question}</strong>
                    <br />
                    <em>Answer: {item.answer}</em>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Button to restart the quiz */}
          <button
            onClick={handleRestartQuiz}
            className="btn btn-danger mt-4"
            style={{ padding: "10px 20px", marginLeft: "10px" }}
          >
            Restart Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default QuizPage;

import React, { useState } from "react";
import { quizzes } from "../../../data.json";
import "./html.css";  // Import the css file

const Html = () => {
  const htmlQuiz = quizzes.find((quiz) => quiz.title === "HTML");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    if (!submitted) { // Allow selection only if not yet submitted
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const correctAnswerIndex = htmlQuiz.questions[currentQuestion].options.indexOf(
        htmlQuiz.questions[currentQuestion].answer
      );
      const isAnswerCorrect = selectedAnswer === correctAnswerIndex;
      setIsCorrect(isAnswerCorrect);
      setScore(isAnswerCorrect ? score + 1 : score);
      setSubmitted(true); // Mark as submitted to block further selections
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < htmlQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setSubmitted(false); // Reset for next question
    }
  };

  const { question, options } = htmlQuiz.questions[currentQuestion];
  
  if (currentQuestion === htmlQuiz.questions.length - 1 && submitted) {
    return (
      <section className="score-page">
        <div className="result-text">
          <h1>Quiz Completed</h1>
          <h1>You scored...</h1>
        </div>
        <div className="result-score">
          <h2>Your final score:</h2>
          <h1>{score}</h1>
          <h2>out of {htmlQuiz.questions.length}</h2>
        </div>
        <button>Play Again</button>
      </section>
    );
  }

  return (
    <section className="quiz-page">
      <div className="question-div">
        <p className="quest-count">
          Question {currentQuestion + 1} of {htmlQuiz.questions.length}
        </p>
        <p className="quest">{question}</p>
      </div>
      <div className="answers">
        {options.map((option, optionIndex) => {
          const isThisAnswerSelected = selectedAnswer === optionIndex;
          const isThisAnswerCorrect = submitted && isThisAnswerSelected && option === htmlQuiz.questions[currentQuestion].answer;
          const correctAnswerIndex = htmlQuiz.questions[currentQuestion].options.indexOf(
            htmlQuiz.questions[currentQuestion].answer
          );

          let className = "answer";
          if (submitted) {
            if (isThisAnswerCorrect || optionIndex === correctAnswerIndex) {
              className += " green";
            } else if (isThisAnswerSelected) {
              className += " red";
            }
          } else if (isThisAnswerSelected) {
            className += " purple";
          }

          return (
            <div
              key={`answer-${optionIndex}`}
              className={className}
              onClick={() => handleAnswerSelect(optionIndex)}
              aria-describedby={`answer-feedback-${optionIndex}`}
            >
              <label
                htmlFor={`answer-${optionIndex}`}
                style={isThisAnswerSelected ? { backgroundColor: '#A729F5', color: 'white' } : {}}
              >
                {String.fromCharCode(65 + optionIndex)}
              </label>
              {option}
              {submitted && (isThisAnswerCorrect || optionIndex === correctAnswerIndex) && (
                <span id={`answer-feedback-${optionIndex}`} aria-live="polite">Correct!</span>
              )}
            </div>
          );
        })}
        {!submitted ? (
          <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className={`${selectedAnswer === null ? "inactive" : ""}`}>
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </section>
  );
};

export default Html;

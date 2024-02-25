import React, { useState } from "react";
import { quizzes } from "../../../data.json";
import "./accessibility.css";

const Accessibility = () => {
  const accessibilityQuiz = quizzes.find(
    (quiz) => quiz.title === "Accessibility"
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null); // Added for feedback

  const handleAnswerSelect = (optionIndex) => {
    const correctAnswer = accessibilityQuiz.questions[currentQuestion].answer;
    setIsCorrect(
      optionIndex ===
        accessibilityQuiz.questions[currentQuestion].options.indexOf(
          correctAnswer
        )
    );
    setScore(isCorrect ? score + 1 : score);
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < accessibilityQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null); // Reset feedback for new question
    }
  };

  const { question, options } = accessibilityQuiz.questions[currentQuestion];

  return (
    <section className="quiz-page">
      <div className="question-div">
        <p className="quest-count">
          Question {currentQuestion + 1} of {accessibilityQuiz.questions.length}
        </p>
        <p className="quest">{question}</p>{" "}
      </div>
      <div className="answers">
        {options.map((option, optionIndex) => {
          const isThisAnswerSelected = selectedAnswer === optionIndex;
          const isThisAnswerCorrect =
            isCorrect !== null &&
            isThisAnswerSelected &&
            option === accessibilityQuiz.questions[currentQuestion].answer;

          return (
            <div
              key={`answer-${optionIndex}`}
              className={`answer ${isThisAnswerSelected ? "selected" : ""} ${
                isThisAnswerCorrect
                  ? "green"
                  : isThisAnswerSelected
                  ? "red"
                  : ""
              }`}
              onClick={() => handleAnswerSelect(optionIndex)}
              aria-describedby={`answer-feedback-${optionIndex}`}
            >
              <label htmlFor={`answer-${optionIndex}`}>
                {String.fromCharCode(65 + optionIndex)}
              </label>
              {option}
              {isThisAnswerCorrect && (
                <span id={`answer-feedback-${optionIndex}`} aria-live="polite">
                  Correct!
                </span>
              )}
              {!isThisAnswerCorrect && isThisAnswerSelected && (
                <span id={`answer-feedback-${optionIndex}`} aria-live="polite">
                  Incorrect
                </span>
              )}
            </div>
          );
        })}
        <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
          {currentQuestion === accessibilityQuiz.questions.length - 1
            ? "View result"
            : "Next question"}
        </button>
      </div>
      {currentQuestion === accessibilityQuiz.questions.length - 1 && (
        <div>
          <h2>
            Your score: {score} / {accessibilityQuiz.questions.length}
          </h2>
        </div>
      )}
    </section>
  );
};

export default Accessibility;

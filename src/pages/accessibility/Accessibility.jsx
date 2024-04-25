import React, { useState } from "react";
import { quizzes } from "../../../data.json";
import "./accessibility.css";

const Accessibility = () => {
  const accessibilityQuiz = quizzes.find((quiz) => quiz.title === "Accessibility");

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
      const correctAnswerIndex = accessibilityQuiz.questions[currentQuestion].options.indexOf(
        accessibilityQuiz.questions[currentQuestion].answer
      );
      const isAnswerCorrect = selectedAnswer === correctAnswerIndex;
      setIsCorrect(isAnswerCorrect);
      setScore(isAnswerCorrect ? score + 1 : score);
      setSubmitted(true); // Mark as submitted to block further selections
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < accessibilityQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setSubmitted(false); // Reset for next question
    }
  };

  const { question, options } = accessibilityQuiz.questions[currentQuestion];
  
  if (currentQuestion === accessibilityQuiz.questions.length - 1 && submitted) {
    return (
      <section className="quiz-page">
        <h1>Quiz Completed</h1>
        <h2>Your final score: {score} / {accessibilityQuiz.questions.length}</h2>
      </section>
    );
  }

  return (
    <section className="quiz-page">
      <div className="question-div">
        <p className="quest-count">
          Question {currentQuestion + 1} of {accessibilityQuiz.questions.length}
        </p>
        <p className="quest">{question}</p>
      </div>
      <div className="answers">
        {options.map((option, optionIndex) => {
          const isThisAnswerSelected = selectedAnswer === optionIndex;
          const isThisAnswerCorrect = submitted && isThisAnswerSelected && option === accessibilityQuiz.questions[currentQuestion].answer;
          const correctAnswerIndex = accessibilityQuiz.questions[currentQuestion].options.indexOf(
            accessibilityQuiz.questions[currentQuestion].answer
          );

          let backgroundColor;
          if (submitted) {
            if (isThisAnswerCorrect) {
              backgroundColor = '#26D782'; // bg-correct
            } else if (isThisAnswerSelected) {
              backgroundColor = '#EE5454'; // bg-incorrect
            } else if (optionIndex === correctAnswerIndex) {
              backgroundColor = '#26D782'; // bg-correct for the correct answer
            }
          } else if (isThisAnswerSelected) {
            backgroundColor = '#A729F5'; // bg-active
          }

          return (
            
            <div
              key={`answer-${optionIndex}`}
              className="answer"
              onClick={() => handleAnswerSelect(optionIndex)}
              aria-describedby={`answer-feedback-${optionIndex}`}
              
            >
              <label
                htmlFor={`answer-${optionIndex}`}
                style={{ backgroundColor }}
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

export default Accessibility;

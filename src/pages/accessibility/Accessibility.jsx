import React, { useState } from "react";
import { quizzes } from "../../../data.json";
import "./accessibility.css";
import useThemeStore from "../../store/themeStore"; // Import the theme store
import ProgressBar from "../../assets/components/ProgressBar"; // Import the ProgressBar component

const Accessibility = () => {
  const accessibilityQuiz = quizzes.find((quiz) => quiz.title === "Accessibility");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { mode } = useThemeStore(); // Use the mode from the theme store

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
      <section className={`score-page ${mode === "light" ? "" : "dark-mode-div"}`}>
        <div className="result-text">
          <h1>Quiz Completed</h1>
          <h1>You scored...</h1>
        </div>
        <div className={`result-score ${mode === "light" ? "" : "dark-mode-div"}`}>
          <h2>Your final score:</h2>
          <h1>{score}</h1>
          <h2>out of {accessibilityQuiz.questions.length}</h2>
        </div>
        <button>Play Again</button>
      </section>
    );
  }

  return (
    <section className={`quiz-page ${mode === "light" ? "" : "dark-mode-div"}`}>
      <ProgressBar current={currentQuestion + (submitted ? 1 : 0)} total={accessibilityQuiz.questions.length} />
      <div className={`question-div ${mode === "light" ? "" : "dark-mode-p"}`}>
        <p className="quest-count">
          Question {currentQuestion + 1} of {accessibilityQuiz.questions.length}
        </p>
        <p className={`quest ${mode === "light" ? "" : "dark-mode-p"}`}>
          {question}
        </p>
      </div>
      <div className={`answers ${mode === "light" ? "" : "dark-mode-p"}`}>
        {options.map((option, optionIndex) => {
          const isThisAnswerSelected = selectedAnswer === optionIndex;
          const isThisAnswerCorrect = submitted && isThisAnswerSelected && option === accessibilityQuiz.questions[currentQuestion].answer;
          const correctAnswerIndex = accessibilityQuiz.questions[currentQuestion].options.indexOf(
            accessibilityQuiz.questions[currentQuestion].answer
          );

          let className = `answer ${mode === "light" ? "" : "dark-mode-div"}`;
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
          <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className={`${selectedAnswer === null ? "inactive" : ""} ${mode === "light" ? "" : "dark-mode-div"}`}>
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion} className={`${mode === "light" ? "" : "dark-mode-div"}`}>
            Next Question
          </button>
        )}
      </div>
    </section>
  );
};

export default Accessibility;

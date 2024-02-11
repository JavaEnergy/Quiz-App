import React, { useState } from "react";
import { quizzes } from "../../../data.json";

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
    <div>
      <p>
        Question {currentQuestion + 1} of {accessibilityQuiz.questions.length}
      </p>
      <p>{question}</p>
      <ul>
        {options.map((option, optionIndex) => (
          <li key={optionIndex}>
            <input
              type="radio"
              name="answer"
              checked={selectedAnswer === optionIndex}
              onChange={() => handleAnswerSelect(optionIndex)}
            />
            {option}
            {/* Added feedback for selected answer */}
            {isCorrect !== null && selectedAnswer === optionIndex && (
              <span aria-live="polite">
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
        {currentQuestion === accessibilityQuiz.questions.length - 1
          ? "View result"
          : "Next question"}
      </button>
      {currentQuestion === accessibilityQuiz.questions.length - 1 && (
        <div>
          <h2>
            Your score: {score} / {accessibilityQuiz.questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Accessibility;

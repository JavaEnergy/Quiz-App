import React from "react";
import { useState } from "react";
import { quizzes } from "../../../data.json";

const Html = () => {
  const htmlQuiz = quizzes.find((quiz) => quiz.title === "HTML");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    const correctAnswer = htmlQuiz.questions[currentQuestion].answer;
    const isCorrect =
      optionIndex ===
      htmlQuiz.questions[currentQuestion].options.indexOf(correctAnswer);
    setScore(isCorrect ? score + 1 : score); //
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < htmlQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for new question
    }
  };

  const { question, options } = htmlQuiz.questions[currentQuestion];

  return (
    <div>
      <p>
        Question {currentQuestion + 1} of {htmlQuiz.questions.length}
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
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
        {currentQuestion === htmlQuiz.questions.length - 1
          ? "View result"
          : "Next question"}
      </button>
      {currentQuestion === htmlQuiz.questions.length - 1 && (
        <div>
          <h2>
            Your score: {score} / {htmlQuiz.questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Html;

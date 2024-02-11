import React from "react";
import { useState } from "react";
import { quizzes } from "../../../data.json";

const Js = () => {
  // Access the JS quiz data
  const jsQuiz = quizzes.find((quiz) => quiz.title === "JavaScript");

  // State variables for current question, selected answer, and score
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    // Retrieve the correct answer from the question data
    const correctAnswer = jsQuiz.questions[currentQuestion].answer;

    // Update score only if the selected answer is correct
    const isCorrect =
      optionIndex ===
      jsQuiz.questions[currentQuestion].options.indexOf(correctAnswer);
    setScore(isCorrect ? score + 1 : score);

    // Update selected answer for feedback
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < jsQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for new question
    }
  };

  // Access question and options for the current question
  const { question, options } = jsQuiz.questions[currentQuestion];

  return (
    <div>
      <p>
        Question {currentQuestion + 1} of {jsQuiz.questions.length}
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
        {currentQuestion === jsQuiz.questions.length - 1
          ? "View result"
          : "Next question"}
      </button>

      {/* Display feedback only after an answer is selected */}
      {selectedAnswer !== null && (
        <div>
          {selectedAnswer === jsQuiz.questions[currentQuestion].answerIndex ? (
            <p>Correct!</p>
          ) : (
            <p>
              Incorrect. The correct answer is:{" "}
              {options[jsQuiz.questions[currentQuestion].answerIndex]}.
            </p>
          )}
        </div>
      )}

      {currentQuestion === jsQuiz.questions.length - 1 && (
        <div>
          <h2>
            Your score: {score} / {jsQuiz.questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Js;

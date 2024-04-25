import React from "react";
import { useState } from "react";
import { quizzes } from "../../../data.json";

const Css = () => {
  // Access the CSS quiz data
  const cssQuiz = quizzes.find((quiz) => quiz.title === "CSS");

  // State variables for current question, selected answer, and score
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    // Retrieve the correct answer from the question data
    const correctAnswer = cssQuiz.questions[currentQuestion].answer;

    // Update score only if the selected answer is correct
    const isCorrect =
      optionIndex ===
      cssQuiz.questions[currentQuestion].options.indexOf(correctAnswer);
    setScore(isCorrect ? score + 1 : score);

    // Update selected answer for feedback
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < cssQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for new question
    }
  };

  // Access question and options for the current question
  const { question, options } = cssQuiz.questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="question-div">
        <p>
          Question {currentQuestion + 1} of {cssQuiz.questions.length}
        </p>
        <p className="quest">{question}</p>
      </div>
      <div className="answers">
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
      </div>
      <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
        {currentQuestion === cssQuiz.questions.length - 1
          ? "View result"
          : "Next question"}
      </button>

      {/* Display feedback only after an answer is selected */}
      {selectedAnswer !== null && (
        <div>
          {selectedAnswer === cssQuiz.questions[currentQuestion].answerIndex ? (
            <p>Correct!</p>
          ) : (
            <p>
              Incorrect. The correct answer is:{" "}
              {options[cssQuiz.questions[currentQuestion].answerIndex]}.
            </p>
          )}
        </div>
      )}

      {currentQuestion === cssQuiz.questions.length - 1 && (
        <div>
          <h2>
            Your score: {score} / {cssQuiz.questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Css;

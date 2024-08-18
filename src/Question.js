import React from "react";

function Question({
  question,
  options,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  handleAnswerSelection,
  canAnswer,
  handleNextQuestion,
}) {
  return (
    <>
      <div className="quiz-header">
        <h2>{question}</h2>
      </div>
      <div
        className="flex justify-center mb-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="question-number">
          Soru {currentQuestion + 1}/{totalQuestions}
        </span>
        <div className="button-group" style={{ marginBottom: "20px" }}>
          <button
            className="btn btn-primary"
            onClick={handleNextQuestion}
            disabled={!canAnswer}
          >
            Sonraki Soru
          </button>
        </div>
      </div>
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedAnswer === option ? "active" : ""
            }`}
            onClick={() => handleAnswerSelection(option)}
            disabled={!canAnswer}
          >
            <span className="font-medium">{option.charAt(0)}</span>
            <span className="ml-2">{option.slice(3)}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;

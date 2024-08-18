import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Question from "./Question";
import Timer from "./Timer";
import Result from "./Result";
import { fetchQuestions, generateOptions } from "./helpers";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [canAnswer, setCanAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const initializeQuestions = async () => {
      const quizQuestions = await fetchQuestions();
      if (quizQuestions) {
        setQuestions(quizQuestions);
      }
    };
    initializeQuestions();
  }, []);

  useEffect(() => {
    if (!countdownFinished && timeRemaining === 0) {
      handleNextQuestion();
    }
  }, [countdownFinished]);

  const handleAnswerSelection = (answer) => {
    if (canAnswer) {
      setSelectedAnswer(answer);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    setCountdownFinished(true);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(30);
      setSelectedAnswer(null);
      setCanAnswer(false);
      setTimeout(() => {
        setCountdownFinished(false);
      }, 500);
    } else {
      setIsCompleted(true);
      toast("Quiz tamamlandı!", {
        type: "success",
        theme: "dark",
        position: "top-center",
        autoClose: 2500,
      });
    }
  };

  if (questions.length === 0) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container">
      <div className="quiz-box">
        {!isCompleted ? (
          <>
            <Question
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              handleAnswerSelection={handleAnswerSelection}
              canAnswer={canAnswer}
              handleNextQuestion={handleNextQuestion}
            />
            <Timer
              timeRemaining={timeRemaining}
              countdownFinished={countdownFinished}
              setCanAnswer={setCanAnswer}
              handleNextQuestion={handleNextQuestion}
            />
          </>
        ) : (
          <Result answers={answers} />
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;

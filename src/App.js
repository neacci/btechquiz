import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { RenderTime } from "./handlers";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [canAnswer, setCanAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [isComplated, setIsComplated] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const quizQuestions = response.data.slice(0, 10).map((item) => ({
          question: item.title,
          options: generateOptions(item.body),
        }));
        setQuestions(quizQuestions);
      } catch (error) {
        toast("Error fetching data.", {
          type: "error",
          theme: "dark",
          position: "top-center",
          autoClose: 2500,
        });
        console.error("Error fetching data:", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!countdownFinished && timeRemaining == 0) {
      handleNextQuestion();
    }
  }, [countdownFinished]);

  const generateOptions = (bodyText) => {
    const words = bodyText.split(" ").slice(0, 4); // first 4 words as options
    return ["A", "B", "C", "D"].map(
      (letter, index) => `${letter}. ${words[index]}`
    );
  };

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
      setIsComplated(true);
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
        {!isComplated && (
          <>
            <div className="quiz-header">
              <h2>{questions[currentQuestion].question}</h2>
            </div>
            <div
              className="flex justify-center mb-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="question-number">
                Soru {currentQuestion + 1}/10
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
              {questions[currentQuestion].options.map((option) => (
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
            <div className="timer-wrapper">
              {!countdownFinished && (
                <CountdownCircleTimer
                  isPlaying={!countdownFinished}
                  duration={timeRemaining}
                  onUpdate={(x) => {
                    if (x < 20) {
                      setCanAnswer(true);
                    }
                  }}
                  onComplete={() => {
                    handleNextQuestion();
                  }}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[20, 15, 10, 0]}
                >
                  {RenderTime}
                </CountdownCircleTimer>
              )}
            </div>
          </>
        )}
        {isComplated && (
          <div className="results">
            <h2>Sonuçlar:</h2>
            <table>
              <thead>
                <tr>
                  <th>Soru</th>
                  <th>Cevap</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer, index) => (
                  <tr key={index}>
                    <td>Soru {index + 1}</td>
                    <td>{answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;

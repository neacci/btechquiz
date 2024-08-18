import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { RenderTime } from "./handlers";

function Timer({
  timeRemaining,
  countdownFinished,
  setCanAnswer,
  handleNextQuestion,
}) {
  return (
    <div className="timer-wrapper">
      {!countdownFinished && (
        <CountdownCircleTimer
          isPlaying={!countdownFinished}
          duration={timeRemaining}
          onUpdate={(x) => {
            if (x <= 20) {
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
  );
}

export default Timer;

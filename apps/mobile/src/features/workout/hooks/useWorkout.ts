import { useState, useEffect } from "react";

export const useWorkout = () => {
  const [seconds, setSeconds] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    timeDisplay: formatTime(seconds),
    isResting: seconds > 0,
    resetTimer: () => setSeconds(45),
  };
};

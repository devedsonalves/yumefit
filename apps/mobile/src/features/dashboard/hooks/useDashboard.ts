import { useState, useEffect } from "react";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    calories: { current: 3600, goal: 3000 },
    workoutProgress: {
      completed: 7,
      total: 8,
      chartData: [20, 40, 30, 60, 45, 80, 50, 70, 60],
    },
    weight: { current: 88.2, start: 85, period: "2023 | Month" },
    stats: [
      { label: "Bench Press", value: "85kg", trend: "+5 kg This week" },
      { label: "Push ups", value: "230", trend: "+20 Reps This week" },
    ],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { isLoading, data };
};

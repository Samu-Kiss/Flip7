import { useState } from "react";
import { simulateOptimalStrategy } from "../logic";

export function useSimEngine() {
  const [simResults, setSimResults] = useState(null);
  const [simRunning, setSimRunning] = useState(false);
  const [simRounds, setSimRounds] = useState(50000);

  const runSimulation = () => {
    const rounds = Math.min(500000, Math.max(1000, Number(simRounds) || 50000));
    setSimRunning(true);
    setTimeout(() => {
      setSimResults(simulateOptimalStrategy(rounds));
      setSimRunning(false);
    }, 50);
  };

  return {
    simResults,
    simRunning,
    runSimulation,
    simRounds,
    setSimRounds
  };
}

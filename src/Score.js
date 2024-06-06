import React, { useState } from "react";
import Food from "./Food";

export default function Score({ width, context, height }) {
  const [score, setScore] = useState(0);

  const updateScore = () => {
    setScore(s => s + 1);
  };

  return (
    <>
      <h1>Score: {score}</h1>
      <Food width={width} context={context} height={height} updateScore={updateScore} />
    </>
  );
}

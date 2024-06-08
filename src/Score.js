import React, { useState } from "react";


export default function Score({updateScore}) {
  const [score, setScore] = useState(0);

 

  return (
    <>
      <h1>Score: {score}</h1>
      
    </>
  );
}

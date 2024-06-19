import React, { useEffect } from "react";
export default function Snake({context,height,width,snake}) {
  
  const drawSnake = () => {
    if(!context) return;
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "black" : "red";
      context.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
    }
  };

 
useEffect(() =>{
  drawSnake();
},[snake])

  return null
}
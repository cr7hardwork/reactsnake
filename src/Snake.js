import React, { useState, useEffect } from "react";

export default function Snake({ context, width, height, foodx, foody, drawFood, randomFood,updateScore}) {
  const [snake, setSnake] = useState([{ x: 15, y: 15 }]);
  const [dir, setDir] = useState("right");
  const head = snake[0];
  




  const moveSnake = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      let head = { ...newSnake[0] };

      switch (dir) {
        case "left":
          head.x -= 1;
          break;
        case "right":
          head.x += 1;
          break;
        case "up":
          head.y -= 1;
          break;
        case "down":
          head.y += 1;
          break;
        default:
          break;
      }

      newSnake.pop();
      newSnake.unshift(head);
      return newSnake;
    });
  };

  const insideWall = () => {
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      if (head.x < 0) {
        head.x = width / 20 - 1;
      } else if (head.x >= width / 20) {
        head.x = 0;
      } else if (head.y < 0) {
        head.y = height / 20 - 1;
      } else if (head.y >= height / 20) {
        head.y = 0;
      }
      return [head, ...prevSnake.slice(1)];
    });
  };

  const drawSnake = () => {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "black" : "red";
      context.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
    }
  };

  const foodEat = () => {
    if (head.x === foodx && head.y === foody) {
      randomFood();
      updateScore()
      setSnake(prevSnake => {
        const newSnake = [...prevSnake, { ...prevSnake[prevSnake.length - 1] }];
        return newSnake;
      });
    }
  };

  const eatTail = () => {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        clearInterval(startInterval);
      }
    }
  };

  const whenSnakeHits = () => {
    if (snake[0].x < 0 || snake[0].x >= width / 20 || snake[0].y < 0 || snake[0].y >= height / 20) 
         clearInterval(startInterval)     
        }

  

  const handleDirectionChange = (event) => {
    const { keyCode } = event;
    if (keyCode === 37 && dir !== "right") setDir("left");
    else if (keyCode === 38 && dir !== "down") setDir("up");
    else if (keyCode === 39 && dir !== "left") setDir("right");
    else if (keyCode === 40 && dir !== "up") setDir("down");
  };





  const startInterval = () => {
    return setInterval(() => {
      moveSnake();
      whenSnakeHits();
      insideWall();
      drawSnake();
      drawFood();
      foodEat();
      eatTail();
    }, 100);
  };


  useEffect(() => {
    const intervalId = startInterval();

    

    window.addEventListener("keydown", handleDirectionChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirectionChange);
    };
  });

return null
}

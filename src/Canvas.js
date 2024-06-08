import React, { useEffect, useRef, useState } from "react";
import Score from "./Score";


export default function Canvas({width,height,updateScore}) {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [snake, setSnake] = useState([{ x: 15, y: 15 }]);
  const [dir, setDir] = useState("right");
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (width / 20)),
    y: Math.floor(Math.random() * (height / 20)),
  });
  const [score,setScore] = useState(0);

  const image = new Image();
  image.src = "https://cdn3.iconfinder.com/data/icons/balls-icons/512/cricket-256.png";

  const moveSnake = () => {
    setSnake((prevSnake) => {
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

      newSnake.unshift(head);
      newSnake.pop();
      return newSnake;
    });
  };

  const eatTail = () => {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        clearInterval(startInterval);
      }
    }
  };

  const drawSnake = () => {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "black" : "red";
      context.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
    }
  };

  const insideWall = () => {
    setSnake((prevSnake) => {
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

  const drawFood = () => {
    context.drawImage(image, food.x * 20, food.y * 20, 20, 20);
  };

  const randomFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * (width / 20)),
      y: Math.floor(Math.random() * (height / 20)),
    };
    setFood(newFood);
    return newFood;
  };

  const foodEat = () => {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      randomFood();
     setScore(updateScore)
            setSnake((prevSnake) => [...prevSnake, { ...prevSnake[prevSnake.length - 1] }]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    setContext(ctx);
  }, [width, height]);

  const startInterval = () => {
    return setInterval(() => {
      moveSnake();
      insideWall();
      drawSnake();
      drawFood();
      foodEat();
      eatTail();
    }, 100);
  };

  const handleDirectionChange = (event) => {
    const { keyCode } = event;
    if (keyCode === 37 && dir !== "right") setDir("left");
    else if (keyCode === 38 && dir !== "down") setDir("up");
    else if (keyCode === 39 && dir !== "left") setDir("right");
    else if (keyCode === 40 && dir !== "up") setDir("down");
  };

  useEffect(() => {
    const intervalId = startInterval();

    window.addEventListener("keydown", handleDirectionChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirectionChange);
    };
  });

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} width={width} height={height} />
      
        <> 
        <Score score = {score} />
        </>
  
    </div>
  );
}

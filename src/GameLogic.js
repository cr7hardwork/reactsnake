import React, { useEffect, useRef, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Score from "./Score";
import Buttons from "./Buttons";

export default function GameLogic({ width, height }) {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [snake, setSnake] = useState([{ x: 15, y: 15 }]);
  const head = snake[0]
  const [dir, setDir] = useState("right");
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (width / 20)),
    y: Math.floor(Math.random() * (height / 20)),
  });
  const [score, setScore] = useState(0);
  const intervalId = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

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
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        clearInterval(intervalId.current);
        setIsRunning(false);
      }
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

  const randomFood = () => {
    setFood({
      x: Math.floor(Math.random() * (width / 20)),
      y: Math.floor(Math.random() * (height / 20)),
    });
  };

  const foodEat = () => {
    if (head.x === food.x && head.y === food.y) {
      randomFood();
      setScore((s) => s + 1);
      setSnake((prevSnake) => [...prevSnake, { ...prevSnake[prevSnake.length] }]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    setContext(ctx);
  }, [width, height]);

  useEffect(() => {
    if (isRunning) {
      const gameLoop = () => {
        moveSnake();
        insideWall();
        foodEat();
        eatTail();
      };

      intervalId.current = setInterval(gameLoop, 100);

      const handleDirectionChange = (event) => {
        const { keyCode } = event;
        if (keyCode === 37 && dir !== "right") setDir("left");
        else if (keyCode === 38 && dir !== "down") setDir("up");
        else if (keyCode === 39 && dir !== "left") setDir("right");
        else if (keyCode === 40 && dir !== "up") setDir("down");
      };

      window.addEventListener("keydown", handleDirectionChange);

      return () => {
        clearInterval(intervalId.current);
        window.removeEventListener("keydown", handleDirectionChange);
      };
    }
  }, [isRunning, dir, food, snake]);

  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseGame = () => {
    if (isRunning) {
      clearInterval(intervalId.current);
      setIsRunning(false);
    }
  };

  const resetGame = () => {
    clearInterval(intervalId.current);
    setIsRunning(true);
    setSnake([{ x: 15, y: 15 }]);
    setDir("right");
    setFood({
      x: Math.floor(Math.random() * (width / 20)),
      y: Math.floor(Math.random() * (height / 20)),
    });
    setScore(0);
  };

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} width={width} height={height} />
      {isRunning && (
        <>
          <Snake context={context} width={width} height={height} snake={snake} />
          <Food context={context} food={food} />
        </>
      )}
      <>
      <Score score={score} />
      <Buttons  startGame = {startGame}pauseGame = {pauseGame}  resetGame = {resetGame}/>
      </>
      
      <div>
       
      </div>
    </div>
  );
}

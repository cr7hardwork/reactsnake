import React, { useEffect, useState } from "react";
import Snake from "./Snake";

export default function Food({ context, width, height ,updateScore }) {


  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (width / 20)),
    y: Math.floor(Math.random() * (height / 20)),
  });

  const image = new Image();
  image.src =  "https://cdn3.iconfinder.com/data/icons/balls-icons/512/cricket-256.png";

  



  const drawFood = () => {
    context.fillStyle = "green";
    context.drawImage(image,food.x * 20, food.y * 20, 20, 20);
  };

  const randomFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * (width / 20)),
      y: Math.floor(Math.random() * (height / 20)),
    };
    setFood(newFood);
    return newFood;
  };



 
  return (
    <Snake
      context={context}
      width={width}
      height={height}
      drawFood={drawFood}
      randomFood={randomFood}
      foodx={food.x}
      foody={food.y}
      updateScore={updateScore}
    />
  );
}

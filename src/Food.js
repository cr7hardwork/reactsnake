import React, { useEffect, useState } from "react";

export default function Food({ context, food}) {

  const image = new Image();
  image.src = "https://cdn3.iconfinder.com/data/icons/balls-icons/512/cricket-256.png";


  useEffect(() => {
    drawFood();
  })



  const drawFood = () => {
    if(!context)return;
    context.drawImage(image, food.x * 20, food.y * 20, 20, 20);
    }
  ;

 
 
  return null
}

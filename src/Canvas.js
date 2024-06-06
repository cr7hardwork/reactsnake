import React, { useEffect, useRef, useState } from "react";
import Food from "./Food";
import Score from "./Score";
import Buttons from "./Buttons";

export default function Canvas({ width, height }) {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    setContext(ctx);
  }, [width, height]);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} width={width} height={height} />
      {context && (
        <> 
          <Food context={context} width={width} height={height} />
          <Score context={context} width={width} height={height} />
          <Buttons width={width} height={height} />
         
        </>
      )}
    </div>
  );
}

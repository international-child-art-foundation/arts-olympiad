"use client";
import React, { useEffect } from "react";

interface Ellipse {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  color: string;
  rotation: (time: number) => { x: number, y: number };
}

export default function TestPage() {
  useEffect(() => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ellipses: Ellipse[] = [
      // Define ellipses with initial positions
      { initialX: canvas.width - 162, initialY: 160, width: 252, height: 252, color: "#B8C480", rotation: circularMotion(2, canvas.width - 162, 160) },
      { initialX: canvas.width - 164, initialY: 157, width: 188, height: 188, color: "#D4E79E", rotation: counterCircularMotion(-2.6, canvas.width - 164, 157) },
      { initialX: canvas.width - 290, initialY: 160, width: 166, height: 166, color: "#922D50", rotation: circularMotion(-2.9, canvas.width - 290, 160) },
      { initialX: canvas.width - 162, initialY: 320, width: 206, height: 206, color: "#501537", rotation: circularMotion(-4.2, canvas.width - 162, 320) },
      { initialX: canvas.width - 274, initialY: 288, width: 194, height: 194, color: "#3C1B43", rotation: counterCircularMotion(-3.5, canvas.width - 274, 288) }
    ];
    let startTime: number | null = null;
    function animate(time: number) {
      if (startTime === null) startTime = time;
      const elapsedTime = (time - startTime) / 1000;
      const roundedTime = parseFloat(elapsedTime.toFixed(2));
      if ([0, 1.75, 3.5, 5.25].includes(roundedTime)) {
        ellipses.forEach((ellipse, index) => {
          const position = ellipse.rotation(elapsedTime);
          console.log(`Ellipse ${index} at time ${elapsedTime.toFixed(2)}s: x=${position.x}, y=${position.y}`);
        });
      }
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ellipses.forEach(ellipse => {
          const position = ellipse.rotation(elapsedTime);
          ctx.beginPath();
          ctx.shadowBlur = 70; // This value alters the size of the shadows of the ellipses
          ctx.shadowColor = ellipse.color;
          ctx.ellipse(position.x, position.y, ellipse.width / 2, ellipse.height / 2, 0, 0, 2 * Math.PI);
          ctx.fillStyle = ellipse.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 20) {
            data[i] = 204;
            data[i + 1] = 235;
            data[i + 2] = 255; 
            data[i + 3] = 255;
          } else {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  // Circular motion function
  function circularMotion(delay: number, centerX: number, centerY: number) {
    return function(time: number) {
      const radius = 30;
      const adjustedTime = (time + delay) % 7; // 7 second duration
      return {
        x: centerX + radius * Math.cos(adjustedTime * 2 * Math.PI / 7),
        y: centerY + radius * Math.sin(adjustedTime * 2 * Math.PI / 7)
      };
    };
  }

  // Counter-circular motion function
  function counterCircularMotion(delay: number, centerX: number, centerY: number) {
    return function(time: number) {
      const radius = 30;
      const adjustedTime = (time + delay) % 7; // 7 second duration
      return {
        x: centerX + radius * Math.cos(-adjustedTime * 2 * Math.PI / 7),
        y: centerY + radius * Math.sin(-adjustedTime * 2 * Math.PI / 7)
      };
    };
  }
  
  return (
    <canvas id="myCanvas" width="500" height="500" className="border sm:scale-75"></canvas>
  );
}

import React, { useRef, useState, useEffect } from "react";

function DrawingBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const gridSize = 10; // Size of each grid square in pixels

  // Draw a grid on the canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  // Start drawing
  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };

  // Stop drawing
  const endDrawing = () => {
    setDrawing(false);
  };

  // Draw a filled grid square at mouse position
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const rect = canvas.getBoundingClientRect();
    // Snap to grid
    const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
    const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, gridSize, gridSize); // Fill the entire grid square
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ border: "1px solid #ccc", background: "#fff" }}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default DrawingBoard;

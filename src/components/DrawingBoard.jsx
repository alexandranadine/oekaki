import React, { useRef, useState, useEffect } from "react";

function DrawingBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);

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
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
    const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;
    setLastPos({ x, y });
    fillSquare(x, y);
  };

  // Stop drawing
  const endDrawing = () => {
    setDrawing(false);
    setLastPos(null);
  };

  // Fill a grid square at (x, y)
  const fillSquare = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, gridSize, gridSize);
  };

  // Draw a filled grid square at mouse position, interpolating if needed
  const draw = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
    const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;

    if (lastPos) {
      // Interpolate between lastPos and current position
      let dx = x - lastPos.x;
      let dy = y - lastPos.y;
      const steps = Math.max(Math.abs(dx), Math.abs(dy)) / gridSize;
      for (let i = 1; i <= steps; i++) {
        const ix = Math.round(lastPos.x + (dx * i) / steps);
        const iy = Math.round(lastPos.y + (dy * i) / steps);
        fillSquare(ix, iy);
      }
    } else {
      fillSquare(x, y);
    }
    setLastPos({ x, y });
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

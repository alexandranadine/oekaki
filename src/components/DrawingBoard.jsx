import React, { useRef, useState } from "react";

function DrawingBoard() {
  const canvasRef = useRef(null); // Reference to the canvas DOM element
  const [drawing, setDrawing] = useState(false); // Tracks whether the user is currently drawing

  // Called when the user presses the mouse button down on the canvas
  // Starts the drawing process and draws the initial point
  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };

  // Called when the user releases the mouse button or moves the mouse out of the canvas
  // Ends the drawing process and resets the drawing path
  const endDrawing = () => {
    setDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  // Called whenever the mouse moves over the canvas
  // Draws a line to the current mouse position if drawing is active
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#222";
    // Draw a line to the current mouse position
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    // Start a new path at the current mouse position
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
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

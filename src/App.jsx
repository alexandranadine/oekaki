import "./index.css";
import DrawingBoard from "./components/DrawingBoard";
import ControlPanel from "./components/ControlPanel";
import React, { useState } from "react";

function App() {
  // State for line color and size
  const [lineColor, setLineColor] = useState("#fafafa");
  const [lineSize, setLineSize] = useState(10);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <DrawingBoard lineColor={lineColor} lineSize={lineSize} />
      <ControlPanel
        lineColor={lineColor}
        setLineColor={setLineColor}
        lineSize={lineSize}
        setLineSize={setLineSize}
      />
    </div>
  );
}

export default App;

import React from "react";

function ControlPanel({ lineColor, setLineColor, lineSize, setLineSize }) {
  const colors = [
    "#fafafa",
    "#222",
    "#e11d48",
    "#2563eb",
    "#16a34a",
    "#f59e42",
    "#fbbf24",
  ];
  const sizes = [4, 8, 10, 16, 24, 32];

  return (
    <div
      className="flex flex-col gap-6 p-4 bg-zinc-600 rounded-r shadow h-[1000px] justify-between"
      style={{ minWidth: 120 }}
    >
      <div className="flex flex-col items-start gap-2">
        <span className="text-zinc-200 mb-1">Color:</span>
        <div className="flex flex-col gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 ${
                lineColor === color ? "border-white" : "border-zinc-600"
              }`}
              style={{ background: color }}
              onClick={() => setLineColor(color)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-zinc-200 mb-1">Size:</span>
        <div className="flex flex-col gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`w-8 h-8 flex items-center justify-center rounded border-2 ${
                lineSize === size ? "border-white" : "border-zinc-600"
              } bg-zinc-700 text-zinc-100`}
              onClick={() => setLineSize(size)}
            >
              <div
                style={{
                  width: size,
                  height: size,
                  background: lineColor,
                  borderRadius: "50%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;

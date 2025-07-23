import React from "react";

// Dots config for each face of dice: index 0 = face 1
const DOTS = [
  [[1, 1]],
  [[0, 0], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 0], [0, 2], [2, 0], [2, 2]],
  [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
];

// PUBLIC_INTERFACE
function DiceSVG({ value = 1, size = 40, color = "#388e3c", shadow = true }) {
  /** Playful dice SVG displaying a number (value 1-6) */
  const dots = DOTS[(value || 1) - 1] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <rect
        x="2"
        y="2"
        rx="8"
        width="32"
        height="32"
        fill="#fff"
        stroke={color}
        strokeWidth="3"
        filter={shadow ? "url(#dice-fun-shadow)" : undefined}
      />
      {dots.map(([r, c], idx) => (
        <circle
          key={idx}
          cx={8 + c * 10}
          cy={8 + r * 10}
          r="3.1"
          fill={color}
        />
      ))}
      <defs>
        <filter id="dice-fun-shadow" x="0" y="0" width="36" height="36">
          <feDropShadow dx="1.2" dy="2" stdDeviation="1" floodColor="#388e3c66" />
        </filter>
      </defs>
    </svg>
  );
}
export default DiceSVG;

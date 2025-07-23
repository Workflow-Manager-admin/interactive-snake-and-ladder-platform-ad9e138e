import React from "react";

// PUBLIC_INTERFACE
function TokenSVG({ color = "#388e3c", size = 26, outline = "#fff", crown = false, style }) {
  /** Playful player token SVG (optionally crowned for winner) */
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" style={style}>
      <ellipse cx={13} cy={17} rx={9} ry={6} fill={color} stroke={outline} strokeWidth="2.2" />
      <circle cx={13} cy={9} r={7} fill={color} stroke={outline} strokeWidth="2" />
      <ellipse cx={13} cy={9} rx={2.9} ry={2} fill="#fff8" opacity="0.58" />
      {crown && (
        <polygon
          points="7,6 10,2 13,5 16,2 19,6"
          fill="#ffc107"
          stroke="#fff"
          strokeWidth="0.8"
        />
      )}
    </svg>
  );
}
export default TokenSVG;

import React from "react";

// PUBLIC_INTERFACE
function SnakeSVG({ w = 54, h = 38, color = "#e53935", style }) {
  /** Playful snake SVG illustration used on snake connections or previews */
  return (
    <svg width={w} height={h} viewBox="0 0 54 38" fill="none" style={style}>
      <g>
        <path
          d="M5,30 C14,24 18,16 36,22 Q47,25 49,10 Q48,5 41,8 Q35,11 44,16"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#snake-shadow)"
        />
        <ellipse cx="47" cy="9" rx="3" ry="4" fill={color} />
        <circle cx="48" cy="7" r="0.7" fill="#fff" />
        {/* Snake tongue */}
        <path d="M51,9 Q52,8 53,11" stroke="#ad1131" strokeWidth="1.1" fill="none" />
      </g>
      {/* Optional shadow filter */}
      <defs>
        <filter id="snake-shadow" x="0" y="0" width="54" height="38">
          <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#e5393588" />
        </filter>
      </defs>
    </svg>
  );
}
export default SnakeSVG;

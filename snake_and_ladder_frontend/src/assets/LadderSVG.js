import React from "react";

// PUBLIC_INTERFACE
function LadderSVG({ w = 50, h = 38, color = "#ffc107", style }) {
  /** Playful ladder SVG illustration */
  return (
    <svg width={w} height={h} viewBox="0 0 50 38" style={style}>
      {/* Side rails */}
      <rect x="10" y="3" width="4" height="32" rx="2" fill={color} />
      <rect x="36" y="3" width="4" height="32" rx="2" fill={color} />
      {/* Rungs */}
      <rect x="12" y="7" width="24" height="3" rx="1.5" fill="#ffe082" />
      <rect x="12" y="15" width="24" height="3" rx="1.5" fill="#ffe082" />
      <rect x="12" y="23" width="24" height="3" rx="1.5" fill="#ffe082" />
      <rect x="12" y="30" width="24" height="3" rx="1.5" fill="#ffe082" />
    </svg>
  );
}
export default LadderSVG;

import React from "react";
import SnakeSVG from "../assets/SnakeSVG";
import LadderSVG from "../assets/LadderSVG";
import TokenSVG from "../assets/TokenSVG";

// Board config
const BOARD_SIZE = 10;
const CELL_COUNT = 100;

// Snakes and ladders connections (start and end cell)
const snakes = [
  [17, 7], [54, 34], [62, 19], [64, 60],
  [87, 24], [93, 73], [95, 75], [99, 78]
];
const ladders = [
  [4, 14], [9, 31], [20, 38], [28, 84],
  [40, 59], [51, 67], [63, 81], [71, 91]
];

// Map cell (1-based) to grid XY [row, col] (0-based)
function cellPos(cell) {
  const row = Math.floor((cell - 1) / BOARD_SIZE);
  let col = (cell - 1) % BOARD_SIZE;
  if (row % 2 === 1) col = BOARD_SIZE - 1 - col;
  return [BOARD_SIZE - 1 - row, col];
}

// Helper for drawing SVG connectors for snakes/ladders
function connectorPos(from, to) {
  const [r1, c1] = cellPos(from);
  const [r2, c2] = cellPos(to);
  // Fractional SVG coords (0-1, 0-1) for left/top of grid
  return {
    x1: (c1 + 0.5) / BOARD_SIZE,
    y1: (r1 + 0.76) / BOARD_SIZE,
    x2: (c2 + 0.55) / BOARD_SIZE,
    y2: (r2 + 0.34) / BOARD_SIZE,
  };
}

// PUBLIC_INTERFACE
function GameBoard({ players }) {
  /** The visual board for the game, now with SVG snakes/ladders/tokens and visual polish */

  // Map from cell -> [players...]
  const playerMap = players.reduce((map, p) => {
    map[p.position] = map[p.position] || [];
    map[p.position].push(p);
    return map;
  }, {});

  // Animated token position for smooth movement (basic)
  return (
    <div className="game-board" style={{
      background: "linear-gradient(135deg,#e9fbe0 0%,#fafafa 60%,#f8f1e0 100%)",
      boxShadow: "0 6px 34px #388e3c16, 0 2px 14px #e5393512"
    }}>
      {/* SVG: Snakes and Ladders connectors, drawn under cells for depth */}
      <svg
        style={{
          position: "absolute",
          left: 0, top: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1
        }}
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        {/* Snakes */}
        {snakes.map(([from, to], idx) => {
          const { x1, y1, x2, y2 } = connectorPos(from, to);
          return (
            <g key={`snake-svg-${idx}`}>
              {/* Custom snake SVG at head */}
              <image
                href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='32'><ellipse cx='28' cy='11' rx='8' ry='10' fill='%23e53935' opacity='.25'/></svg>"
                x={Math.min(x1, x2) - 0.025} y={Math.min(y1, y2) - 0.025}
                width={Math.abs(x2-x1)+0.05} height={Math.abs(y2-y1)+0.09}
                opacity="0.62" style={{mixBlendMode: "multiply"}}
              />
              {/* Wavy snake curve */}
              <path
                d={`
                  M ${x1},${y1}
                  Q ${(x1 + x2)/2 + 0.03},${(y1 + y2)/2 + 0.025}
                    ${x2},${y2}
                `}
                stroke="#e53935"
                strokeWidth="0.025"
                fill="none"
                filter="url(#s-shadow)"
                strokeLinecap="round"
              />
              <circle cx={x1} cy={y1} r="0.028" fill="#e53935" filter="url(#sd-sh)" />
              <circle cx={x2} cy={y2} r="0.02" fill="#ae1623" opacity="0.7"/>
            </g>
          );
        })}
        {/* Ladders */}
        {ladders.map(([from, to], idx) => {
          const { x1, y1, x2, y2 } = connectorPos(from, to);
          // Ladder angle and rung count:
          const rungCt = 4, dx = (x2-x1), dy=(y2-y1);
          return (
            <g key={`ladder-svg-${idx}`}>
              {/* Rails */}
              <line x1={x1-0.012} y1={y1} x2={x2-0.012} y2={y2}
                stroke="#ffd44c" strokeWidth="0.024" filter="url(#l-shadow)" />
              <line x1={x1+0.012} y1={y1} x2={x2+0.012} y2={y2}
                stroke="#ffc107" strokeWidth="0.024" />
              {/* Rungs */}
              {Array(rungCt).fill(0).map((_, i) => {
                // Position each rung fractionally between endpoints
                const fr = (i+1)/(rungCt+1);
                return <line
                  key={i}
                  x1={x1-0.013 + dx*fr} y1={y1 + dy*fr}
                  x2={x1+0.013 + dx*fr} y2={y1 + dy*fr}
                  stroke="#ffe082" strokeWidth="0.018" />
              })}
            </g>
          );
        })}
        {/* Shadow filter defs */}
        <defs>
          <filter id="s-shadow">
            <feDropShadow dx="0.005" dy="0.008" stdDeviation="0.003" floodColor="#e5393583"/>
          </filter>
          <filter id="l-shadow">
            <feDropShadow dx="0.006" dy="0.01" stdDeviation="0.008" floodColor="#ffc10780"/>
          </filter>
          <filter id="sd-sh">
            <feDropShadow dx="0" dy="0.01" stdDeviation="0.03" floodColor="#c0142a44"/>
          </filter>
        </defs>
      </svg>

      {/* 100 board cells */}
      <div className="board-grid">
      {[...Array(CELL_COUNT)].map((_, idx) => {
        const cellNum = idx + 1;
        const [r, c] = cellPos(cellNum);
        const key = `cell-${r}-${c}`;

        // Highlight cell if snake or ladder starts
        const isSnakeHead = snakes.some(([from]) => from === cellNum);
        const isLadderBase = ladders.some(([from]) => from === cellNum);

        // Animation stagger for tokens (helps movement visual pop)
        return (
          <div
            className="board-cell"
            key={key}
            style={{
              background: isSnakeHead
                ? "linear-gradient(100deg,#fae4e7 0%,#faecea 55%,#fff7)"
                : isLadderBase
                  ? "linear-gradient(80deg,#fffccc 0%,#f8f6a6 48%,#fff7)"
                  : undefined,
              borderRadius: "11px",
              boxShadow: (isSnakeHead||isLadderBase)? "0 1px 9px #e5393569" : undefined,
              borderColor: isSnakeHead? "#e5393555"
                          : isLadderBase? "#ffc10777" : undefined,
              zIndex: 2,
              position: "relative"
            }}
          >
            {/* Cell number: larger, playful font */}
            <span className="cell-num" style={{
              fontSize: "1.08vw",
              color: isSnakeHead ? "#e53935" :
                    isLadderBase ? "#ffc107" : "var(--accent)",
              fontWeight: isSnakeHead||isLadderBase? 700: 600,
              textShadow: isSnakeHead ? "1px 1px 0 #fff, 1px 2px #ffcdd277"
                        : isLadderBase ? "1px 0.8px #fff, 0 1px #fffbd3"
                        : undefined
            }}>{cellNum}</span>
            {/* Playful mini SVG preview */}
            <span
              style={{
                position: "absolute", top: 5, left: 6,
                zIndex: 1,
                opacity: (isSnakeHead||isLadderBase)? "0.73" : 0,
                pointerEvents: "none"
              }}>
              {isSnakeHead && <SnakeSVG w={22} h={17} style={{transform: "rotate(-10deg)"}} />}
              {isLadderBase && <LadderSVG w={19} h={17} style={{transform: "rotate(-7deg)"}} />}
            </span>

            {/* Animated tokens of all players in this cell */}
            {playerMap[cellNum] && (
              <div className="cell-tokens" style={{marginTop: 11}}>
                {playerMap[cellNum].map((p, i) => (
                  <span
                    className="token"
                    key={p.id}
                    style={{
                      background: "none",
                      marginRight: 2,
                      transition: "transform 0.37s cubic-bezier(.67,-0.18,.11,.98)",
                      transform: `translateY(-${i*4}px) scale(${1 - 0.08*i})`
                    }}
                  >
                    <TokenSVG color={p.color} size={23-i*2.7} style={{
                      filter: turnHighlight(players, p)? "drop-shadow(0 0 6px #388e3c44)" : undefined,
                      opacity: (turnHighlight(players, p)? 1 : 0.82)
                    }} />
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}

// Token highlight: the current player
function turnHighlight(players, p) {
  const curTurn = players.findIndex(pl => pl.position === p.position);
  return players[curTurn]?.id === p.id;
}

export default GameBoard;

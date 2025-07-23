import React from "react";

// Board config
const BOARD_SIZE = 10;
const CELL_COUNT = 100;

// Minimal snakes and ladders visualization
const snakes = [
  [17, 7], [54, 34], [62, 19], [64, 60], [87, 24], [93, 73], [95, 75], [99, 78]
];
const ladders = [
  [4, 14], [9, 31], [20, 38], [28, 84], [40, 59], [51, 67], [63, 81], [71, 91]
];

function cellPos(cell) {
  // Converts 1-based cell number to [row, col], 0-based
  const row = Math.floor((cell - 1) / BOARD_SIZE);
  let col = (cell - 1) % BOARD_SIZE;
  if (row % 2 === 1) col = BOARD_SIZE - 1 - col;
  return [BOARD_SIZE - 1 - row, col];
}

// PUBLIC_INTERFACE
function GameBoard({ players }) {
  /** The visual board for the game with snakes and ladders drawn */

  // Map for quick player position lookup
  const playerMap = players.reduce((map, p) => {
    map[p.position] = map[p.position] || [];
    map[p.position].push(p);
    return map;
  }, {});

  // Get inline style for connecting line between two cells
  function connectionStyle(from, to, type) {
    const [r1, c1] = cellPos(from);
    const [r2, c2] = cellPos(to);
    const color = type === 'snake' ? '#e53935' : '#ffc107';
    return {
      position: 'absolute',
      left: `calc(${(c1 + 0.5) * 10}% - 1vw)`,
      top: `calc(${(r1 + 0.5) * 10}% - 1vw)`,
      width: `${Math.hypot(c2 - c1, r2 - r1) * 10}vw`,
      height: '4px',
      background: color,
      transformOrigin: '0 2px',
      transform: `rotate(${Math.atan2(r2 - r1, c2 - c1) * 180 / Math.PI}deg)`,
      opacity: 0.8,
      borderRadius: 4,
      zIndex: 2
    };
  }

  return (
    <div className="game-board">
      {/* Snakes/Ladders Connections */}
      {snakes.map(([from, to], i) => (
        <div
          key={`snake-${i}`}
          className="snake-conn"
          style={connectionStyle(from, to, 'snake')}
        />
      ))}
      {ladders.map(([from, to], i) => (
        <div
          key={`ladder-${i}`}
          className="ladder-conn"
          style={connectionStyle(from, to, 'ladder')}
        />
      ))}

      {/* 100 cells, 10x10 */}
      <div className="board-grid">
        {[...Array(CELL_COUNT)].map((_, idx) => {
          const cellNum = idx + 1;
          const [r, c] = cellPos(cellNum);
          const cellKey = `cell-${r}-${c}`;
          return (
            <div className="board-cell" key={cellKey}>
              {/* Cell number (small) */}
              <span className="cell-num">{cellNum}</span>
              {/* Player tokens in this cell */}
              {playerMap[cellNum] && (
                <div className="cell-tokens">
                  {playerMap[cellNum].map((p, i) => (
                    <span
                      className="token"
                      key={p.id}
                      style={{
                        background: p.color,
                        left: `${i * 18}px`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default GameBoard;

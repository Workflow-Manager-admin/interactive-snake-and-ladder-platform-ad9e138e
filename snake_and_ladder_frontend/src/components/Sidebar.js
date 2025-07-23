import React from "react";
import DiceSVG from "../assets/DiceSVG";
import TokenSVG from "../assets/TokenSVG";

// PUBLIC_INTERFACE
function Sidebar({ players, turn, dice, onRoll, onNewGame, gameStatus, winner }) {
  /** Sidebar for player info, controls, dice, and status (modern/playful polish + SVG assets) */

  return (
    <aside className="sidebar">
      <header className="sidebar-header" style={{marginBottom:"12px"}}>
        <h2 style={{display: "flex", alignItems:"center", gap:6, fontWeight: 700, fontFamily: "Quicksand,Segoe UI,sans-serif"}}>
          <TokenSVG color="#388e3c" size={20} />
          Snake &amp; Ladder
        </h2>
        <button className="new-game-btn" onClick={onNewGame}>New Game</button>
      </header>
      <section className="players-section">
        <h4>Players</h4>
        <ul>
          {players.map((p, idx) => (
            <li key={p.id} style={{
              fontWeight: turn === idx ? "bold" : "normal",
              background: turn === idx ? "#e8f5e9" : undefined,
              borderRadius: turn === idx ? "8px" : undefined,
              padding: turn === idx ? "2px 5px 2px 2px" : "2px"
            }}>
              <span
                className="player-indicator"
                style={{
                  background: "none",
                  marginRight: 7,
                  verticalAlign:"middle",
                  display:"inline-block"
                }}
              >
                <TokenSVG color={p.color} size={17} />
              </span>
              {p.name}
              <span className="player-pos" style={{fontWeight: 400}}> (at {p.position})</span>
              {turn === idx && gameStatus === "playing" && (
                <span className="turn-dot" title="Current Turn">
                  <svg width="9" height="9"><circle cx="4.5" cy="4.5" r="4" fill="#ffc107"/></svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="dice-section" style={{marginTop: 3, marginBottom:2}}>
        <h4>Dice</h4>
        <button
          className="roll-btn"
          disabled={gameStatus === "ended"}
          onClick={onRoll}
          style={{
            display: "flex", alignItems: "center", gap: "9px",
            boxShadow: "0 2px 9px #e5393533"
          }}
        >
          <DiceSVG value={dice || 1} size={28} color="#e53935" shadow={false} />
          <span style={{fontWeight: 500, fontSize: "1.01em"}}>Roll</span>
        </button>
        <div className="dice-face" style={{marginLeft:2, marginTop:2, minWidth:38}}>
          {dice !== null ? (
            <span className="dice-anim">
              <DiceSVG value={dice} size={36} color="#388e3c"/>
            </span>
          ) : (
            <span className="dice-placeholder" style={{fontFamily: "monospace", fontSize: 23, color: "#bdbdbd"}}>?</span>
          )}
        </div>
      </section>
      <section className="status-section">
        <h4>Status</h4>
        {gameStatus === "playing" ? (
          <div>
            Turn: <TokenSVG color={players[turn]?.color || "#388e3c"} size={14} style={{verticalAlign:"middle"}} />{" "}
            <b>{players[turn].name}</b>
          </div>
        ) : (
          <div>
            <b>Game Over!</b>
          </div>
        )}
        {winner && (
          <div className="winner-banner" style={{marginTop: 5}}>
            <TokenSVG color={players.find(p=>p.name===winner)?.color || "#388e3c"} size={17} crown />
            <span style={{marginLeft: 6, fontWeight: 700, color: "#e53935"}}>{winner}</span>
          </div>
        )}
      </section>
    </aside>
  );
}

export default Sidebar;

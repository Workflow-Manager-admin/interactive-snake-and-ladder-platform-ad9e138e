import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ players, turn, dice, onRoll, onNewGame, gameStatus, winner }) {
  /** Sidebar for player info, controls, dice, and status */

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h2>Snake &amp; Ladder</h2>
        <button className="new-game-btn" onClick={onNewGame}>New Game</button>
      </header>
      <section className="players-section">
        <h4>Players</h4>
        <ul>
          {players.map((p, idx) => (
            <li key={p.id} style={{ fontWeight: turn === idx ? "bold" : "normal" }}>
              <span
                className="player-indicator"
                style={{
                  background: p.color,
                  opacity: turn === idx ? 1 : 0.6,
                  marginRight: 8
                }}
              ></span>
              {p.name} <span className="player-pos">(at {p.position})</span>
              {turn === idx && gameStatus === "playing" && <span className="turn-dot">⬤</span>}
            </li>
          ))}
        </ul>
      </section>
      <section className="dice-section">
        <h4>Dice</h4>
        <button
          className="roll-btn"
          disabled={gameStatus === "ended"}
          onClick={onRoll}
        >
          Roll
        </button>
        <div className="dice-face">
          {dice !== null ? (
            <span className="dice-anim">{dice}</span>
          ) : (
            <span className="dice-placeholder">?</span>
          )}
        </div>
      </section>
      <section className="status-section">
        <h4>Status</h4>
        {gameStatus === "playing" ? (
          <div>
            Turn: <b>{players[turn].name}</b>
          </div>
        ) : (
          <div>
            <b>Game Over!</b>
          </div>
        )}
        {winner && (
          <div className="winner-banner">
            Winner: <span>{winner}</span>
          </div>
        )}
      </section>
    </aside>
  );
}

export default Sidebar;

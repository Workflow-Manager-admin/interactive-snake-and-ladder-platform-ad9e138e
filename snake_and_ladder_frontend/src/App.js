import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Sidebar from './components/Sidebar';

// Default local player setup: 2 players for local multiplayer demo
const DEFAULT_PLAYERS = [
  { name: "Player 1", color: "#388e3c", position: 1, id: 1 },
  { name: "Player 2", color: "#e53935", position: 1, id: 2 }
];

// PUBLIC_INTERFACE
function App() {
  /** This is the main Snake and Ladder game app for local multiplayer */

  const [players, setPlayers] = useState(DEFAULT_PLAYERS);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing" | "ended"
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  const startNewGame = () => {
    setPlayers(players.map(p => ({ ...p, position: 1 })));
    setTurn(0);
    setDice(null);
    setGameStatus("playing");
    setWinner(null);
  };

  // PUBLIC_INTERFACE
  const rollDice = () => {
    if (gameStatus === "ended") return;
    const value = Math.floor(Math.random() * 6) + 1;
    setDice(value);

    setTimeout(() => {
      movePlayer(value);
    }, 300); // brief delay for dice roll "animation"
  };

  // Moves current player according to rolled dice
  const movePlayer = (steps) => {
    const snakesAndLadders = {
      4: 14, 9: 31, 17: 7, 20: 38, 28: 84, 40: 59,
      51: 67, 54: 34, 62: 19, 63: 81, 64: 60,
      71: 91, 87: 24, 93: 73, 95: 75, 99: 78
    };
    let newPlayers = [...players];
    let cur = turn;
    let player = { ...newPlayers[cur] };
    let nextPos = player.position + steps;
    if (nextPos > 100) nextPos = player.position; // no move if overshoot
    if (snakesAndLadders[nextPos]) nextPos = snakesAndLadders[nextPos];
    player.position = nextPos;
    newPlayers[cur] = player;

    setPlayers(newPlayers);

    // Win check
    if (nextPos === 100) {
      setGameStatus("ended");
      setWinner(player.name);
      return;
    }
    // Next turn
    setTimeout(() => {
      setTurn((cur + 1) % players.length);
      setDice(null);
    }, 500); // short pause for movement animation
  };

  return (
    <div className="snake-ladder-app">
      <Sidebar
        players={players}
        turn={turn}
        dice={dice}
        onRoll={rollDice}
        onNewGame={startNewGame}
        gameStatus={gameStatus}
        winner={winner}
      />
      <main className="main-area">
        <GameBoard players={players} />
        {gameStatus === "ended" && (
          <div className="game-over-banner">
            🎉 <strong>{winner}</strong> wins!
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

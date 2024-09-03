import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Assuming you will add custom styles

function Homepage() {
  
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

  const handleJoinGame = () => {
    if (gameId.trim()) {
      navigate(`/game/${gameId}`);
    } else {
      alert("Please enter a valid game ID.");
    }
  };

  return (
    <div className="Homepage">
      <header className="App-header">
        <h1>Code Names</h1>
        <button className="btn">Create New Game</button>
        <p>or</p>
        <label htmlFor="game-id">Enter Game ID</label>
        <input 
          type="text" 
          id="game-id" 
          placeholder="Enter game ID" 
          className="game-id-input"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button className="btn" onClick={handleJoinGame}>Join Game</button>
      </header>
    </div>
  );
}

export default Homepage;


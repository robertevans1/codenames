import '../App.css';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameWords, toggleWordRevealed, rateClue } from '../api/gameService'; // Import the function
import {WordButton, ButtonState} from './WordButton';

function Game() {
  const { game_id } = useParams();
  const [buttonStates, setButtonStates] = useState([]);
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clueRatings, setClueRatings] = useState([]);

  const updateGameState = useCallback((data) => {
    setButtonStates(data.map(item => new ButtonState({ word: item.word,
      revealed: item.revealed,
      category: item.category, 
      for_spymaster: isSpymaster,
      game_word_id: item.id
    } )));
  }, [isSpymaster])

  useEffect(() => {
    const loadGameWords = async () => {
      try {
        const data = await fetchGameWords(game_id);
        updateGameState(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadGameWords();

    const intervalId = setInterval(loadGameWords, 5000); // Poll every 5 seconds

     return () => clearInterval(intervalId);
  }, [game_id, updateGameState, clueRatings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div class="Game">
      <header className="App-header">
      <div class="app-container">
          <div class="grid-container">
            {buttonStates.map((state, index) => (
              <WordButton
                key={index}
                buttonState={state}
                onClicked={async () => {  
                  const data = await toggleWordRevealed(game_id, state.game_word_id);
                  updateGameState(data);
                }}
              />
            ))}
          </div>
          <div className="settings-container">
            <div className="toggle-container">
              <label className="toggle-label">Reveal Colours? (For Spymasters only)</label>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={isSpymaster}
                onChange={(e) => {
                  const newSpymasterStatus = e.target.checked;
                  console.log(`new status is ${newSpymasterStatus}`);
                  setIsSpymaster(newSpymasterStatus);
                }}
              />
            </div>
            <div className = "clue-container">
              <input type="text" placeholder="Enter your clue here" />
              <input type="number" placeholder="How many words?" />
              <button onClick={async () => {
                const clue = document.querySelector('input[type="text"]').value;
                const ratings = await rateClue(game_id, clue);
                setClueRatings(ratings);
              }}>Submit Clue</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Game;

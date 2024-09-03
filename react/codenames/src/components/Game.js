import '../App.css';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameWords, toggleWordRevealed } from '../api/gameService'; // Import the function
import WordButton from './WordButton';

class ButtonState {
  constructor({
    word, 
    revealed,
    category, 
    for_spymaster,
    game_word_id,
  } = {}) {
    this.word = word;
    this.revealed = revealed;
    this.category = category;
    this.for_spymaster = for_spymaster;
    this.game_word_id = game_word_id;
  }

  // add print method
  toString() {
    console.log(`Word: ${this.word}, Revealed: ${this.revealed}, Category: ${this.category}, For Spymaster: ${this.for_spymaster}`);
  }
}

function Game() {
  const { game_id } = useParams();
  const [buttonStates, setButtonStates] = useState([]);
  const [isSpymaster, setIsSpymaster] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateGameState = (data) => {
    setButtonStates(data.map(item => new ButtonState({ word: item.word,
      revealed: item.revealed,
      category: item.category, 
      for_spymaster: isSpymaster,
      game_word_id: item.id
    } )));
  }

  useEffect(() => {
    const loadGameWords = async () => {
      try {
        const data = await fetchGameWords(game_id);
        console.log(`is spymaster in use effect: ${isSpymaster}`);
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
  }, [isSpymaster]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Game">
      <header className="App-header">
      <div className="app-container">
          <div className="grid-container">
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
          <div className="toggle-container">
            <label className="toggle-label">Spymaster?</label>
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
        </div>
      </header>
    </div>
  );
}

export default Game;

import React from 'react';
import './App.css'; // Assuming your styles are in App.css
import { useState, useEffect } from 'react';

function WordButton({ word }) {
  return <button>{word}</button>;
}

function App() {

  const [buttonLabels, setButtonLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     // Fetch button labels from the API
     const fetchButtonLabels = async () => {
      try {
        const response = await fetch('http://localhost:8000/games/1/words/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const labels = data.map((item) => item.word);
        setButtonLabels(labels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchButtonLabels();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="grid-container">
          {buttonLabels.map((label, index) => (
            <WordButton key={index} word={label} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css'; // Assuming your styles are in App.css

function WordButton({ word }) {
  return <button>{word}</button>;
}

function App() {
  const buttonLabels = [
    'Button 1',
    'Button 2',
    'Button 3',
    'Button 4',
    'Button 5',
    'Button 666',
    'Button 7',
    'Button 8',
    'Button 9',
  ];

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

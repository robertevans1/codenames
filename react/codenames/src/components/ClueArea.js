import React, { useState } from 'react';

function ClueArea({ game_id }) {
    const [clueText, setClueText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [clueRatings, setClueRatings] = useState([]);

    return (
        <div className="clue-container">
            <input
                type="text"
                placeholder="Enter your clue here"
                value={clueText}
                onChange={(e) => setClueText(e.target.value)}
            />
            <input
                type="number"
                placeholder="How many words?"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
            />
            <button
                onClick={async () => {
                    const clue = clueText;
                    const ratings = await rateClue(game_id, clue);
                    setClueRatings(ratings);
                }}
            >
                Submit Clue
            </button>
        </div>
    );
}

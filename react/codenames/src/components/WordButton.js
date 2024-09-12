import React, { useState, useEffect, useRef } from 'react';
import './WordButton.css';

function getButtonStatus(category, revealed, for_spymaster) {
  const status = [
    revealed ? 'revealed' : 'not_revealed',
    for_spymaster && !revealed ? 'for_spymaster' : '',
    for_spymaster || revealed ? category : ''
  ].filter(Boolean).join('-');

  return status;
}

function WordButton({ buttonState, onClicked }) {
  const { word, revealed, category, for_spymaster } = buttonState;
  let buttonStatus = getButtonStatus(category, revealed, for_spymaster);

  // Create refs for container and text elements
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // State to hold the calculated font size
  const [fontSize, setFontSize] = useState('1em'); // Default font size

  useEffect(() => {
    function adjustFontSize() {
      if (containerRef.current && textRef.current) {
        // Get the container width
        const containerWidth = containerRef.current.offsetWidth;

        // Get the length of the text
        const textLength = word.length;

        // Adjust the divisor as necessary to fit your design
        const divisor = textLength * 1.1; // Adjust this value to tweak scaling

        // Calculate font size based on container width and text length
        const calculatedFontSize = containerWidth / divisor;

        // Set the font size (ensure it's not too small or too large)
        const clampedFontSize = Math.max(12, Math.min(calculatedFontSize, 24));

        setFontSize(`${clampedFontSize}px`);
      }
    }

    // Adjust font size on component mount and when 'word' changes
    adjustFontSize();

    // Adjust font size when window is resized
    window.addEventListener('resize', adjustFontSize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [word]);

  return (
    <button className="grid-item" onClick={onClicked}>
      <div
        ref={containerRef}
        className={`card-outer outer-${buttonStatus}`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} // Ensure no wrapping or overflow
      >
        <div
          ref={textRef}
          className={`card-inner ${buttonStatus} text`}
          style={{ fontSize: fontSize, whiteSpace: 'nowrap' }}
        >
          {word}
        </div>
      </div>
    </button>
  );
}

export default WordButton;

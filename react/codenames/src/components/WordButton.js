import './WordButton.css';

function getButtonStatus(category, revealed, for_spymaster) {
    const status = [
      revealed ? 'revealed' : 'not_revealed',
      for_spymaster && !revealed ? 'for_spymaster' : '',
      for_spymaster || revealed ? category : ''
    ].filter(Boolean).join('-');
  
    console.log(`Button status is: ${status}`);
    return status;
  }


function WordButton({ buttonState, onClicked}) {
    const { word, revealed, category, for_spymaster } = buttonState;
    console.log(`state is ${buttonState}`);
    let buttonStatus = getButtonStatus(category, revealed, for_spymaster);
    return (
        <button className={`button ${buttonStatus}`} onClick={onClicked}>
        {word}
        </button>
    );
}

export default WordButton;
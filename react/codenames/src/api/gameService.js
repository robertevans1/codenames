const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = BASE_URL + '/games/';
const CREATE_GAME_URL = BASE_URL + '/games/create/';
function getRateClueUrl(gameId) {
    return API_URL + gameId + '/rate_clue';
}

// Function to fetch data from the API
export async function fetchGameWords(gameId) {
    try {
        const response = await fetch(API_URL + gameId + '/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return deserializeGameWords(data);
    } catch (error) {
        console.error('Failed to fetch game words:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function toggleWordRevealed(gameId, gameWordId) {
    try {
      const response = await fetch(`${API_URL}${gameId}/words/${gameWordId}/toggle/`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return deserializeGameWords(data);
  } catch (error) {
      console.error('Failed to fetch game words:', error);
      throw error; // Re-throw the error to be handled by the caller
  }
}

export async function createGame() {
    try {
        console.log('Creating a new game at URL:', CREATE_GAME_URL);
        const response = await fetch(CREATE_GAME_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Failed to create game:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function rateClue(gameId, clue_word, rating) {
    const url = getRateClueUrl(gameId) + '?clue=' + clue_word;
    const response = await fetch(url);
    const data = await response.json();
    return deserializeClueRatings(data);
}

// Function to deserialize API response
function deserializeGameWords(data) {
  // Assuming the data is an array of objects
  return data.map(item => ({
    id: item.id,
    word: item.word.word,
    revealed: item.revealed,
    category: item.category,
  }));
}

function deserializeClueRatings(data) {
    return data.map(item => ({
        gameWordId: item.game_word_id,
        score: item.distance,
    }));
}

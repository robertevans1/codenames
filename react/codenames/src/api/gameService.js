const BASE_URL = 'http://codenames-production-f422.up.railway.app';
const API_URL = BASE_URL + '/games/';
const CREATE_GAME_URL = BASE_URL + '/games/create/';

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

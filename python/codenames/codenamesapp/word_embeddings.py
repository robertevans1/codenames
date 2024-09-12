from scipy import spatial
from .word_embedding_data import WordEmbeddingData

class WordEmbeddings:

    embeddings_dict = {}

    def __init__(self):
        self.embeddings_dict = WordEmbeddingData().embeddings_dict

    def find_closest_embeddings(self, embedding):
        return sorted(self.embeddings_dict.keys(), key=lambda word: spatial.distance.euclidean(self.embeddings_dict[word], embedding))
    
    def find_distance(self, embedding1, embedding2):
        return spatial.distance.euclidean(embedding1, embedding2)
    
    def distance_to_clue(self, test_words, clue_word):
        # print number of words in dictionary
        print(f"Number of words in dictionary: {len(self.embeddings_dict)}")

        # make test_words lowercase
        test_words = [word.lower() for word in test_words]

        # check all test words are in dictionary
        for word in test_words:
            if word not in self.embeddings_dict:
                raise ValueError(f"Word {word} not in embeddings dictionary")

        distances = []
        for word in test_words:
            distance = self.find_distance(self.embeddings_dict[clue_word], self.embeddings_dict[word])
            distances.append(WordAndDistance(word, distance))
            distances.sort(key=lambda x: x.distance)
        return distances
    
    def game_words_distance_to_clue(self, game_words, clue_word):
        # check all test words are in dictionary
        distances = []
        for game_word in game_words:
            word = game_word.word.word.lower()
            if word not in self.embeddings_dict:
                raise ValueError(f"Word {word} not in embeddings dictionary")

            distance = self.find_distance(self.embeddings_dict[clue_word], self.embeddings_dict[word])
            distances.append(WordAndDistance(game_word, distance))
            distances.sort(key=lambda x: x.distance)

        return distances
    
class WordAndDistance:  
    def __init__(self, word, distance):
        self.word = word
        self.distance = distance

    def __str__(self):
        return f"Word: {self.word.word}, Distance: {self.distance}"
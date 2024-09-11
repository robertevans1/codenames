import numpy as np

class WordEmbeddingData:
    _instance = None
    embeddings_dict = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(WordEmbeddingData, cls).__new__(cls)
        return cls._instance

    def load_data(self, file_path):
        with open(file_path, 'r', encoding="utf-8") as f:
            for line in f:
                values = line.split()
                word = values[0]
                vector = np.asarray(values[1:], "float32")
                self.embeddings_dict[word] = vector
from django.apps import AppConfig

from .word_embedding_data import WordEmbeddingData

class CodenamesappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'codenamesapp'

    def ready(self):
        word_embedding_data = WordEmbeddingData()
        word_embedding_data.load_data("codenamesapp/assets/glove.6B.300d.txt")

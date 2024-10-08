from rest_framework import serializers
from .models import Word, GameWord

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id', 'word']

class GameWordSerializer(serializers.ModelSerializer):
    word = WordSerializer()
    class Meta:
        model = GameWord
        fields = ['id', 'word', 'revealed', 'category']

class DistancesSerializer(serializers.Serializer):
    game_word_id = serializers.PrimaryKeyRelatedField(source='word', read_only=True)
    distance = serializers.FloatField()

    


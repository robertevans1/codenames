from rest_framework import serializers
from .models import Word

class GameWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id', 'word']
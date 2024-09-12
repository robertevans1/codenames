from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import GameWordSerializer, DistancesSerializer
from .models import Game
from rest_framework.decorators import api_view
from .word_embeddings import WordEmbeddings
from .word_embedding_data import WordEmbeddingData

def index(request):
    return HttpResponse("Hello, world. You're at the codenames index.")

class GameWordsView(APIView):
    def get(self, request, game_id):
        game = get_object_or_404(Game, pk=game_id)
        gamewords = game.gamewords.all()
        serializer = GameWordSerializer(gamewords, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def toggle_game_word(self, game_id, game_word_id):
    game = get_object_or_404(Game, pk=game_id)
    game_word = get_object_or_404(game.gamewords, pk=game_word_id)
    game_word.toggle()
    gamewords = game.gamewords.all()
    serializer = GameWordSerializer(gamewords, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def create_game(self):
    game = Game.objects.create()
    game.save()
    response_data = {
        'id': game.id
    }
    return Response(response_data, status=status.HTTP_201_CREATED)

class RateClueView(APIView):
    def get(self, request, game_id):
        game = get_object_or_404(Game, pk=game_id)
        clue = request.GET.get('clue')

        if not clue:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        wordEmbeddings = WordEmbeddings()
        word_list =  word_list = game.gamewords.all()
        distances = wordEmbeddings.game_words_distance_to_clue(word_list, clue)
        serializer = DistancesSerializer(distances, many=True)
        return Response(serializer.data)


from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import GameWordSerializer
from .models import Game
from rest_framework.decorators import api_view

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
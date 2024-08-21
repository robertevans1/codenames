from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import GameWordSerializer
from .models import Game

def index(request):
    return HttpResponse("Hello, world. You're at the codenames index.")

class GameWordsView(APIView):
    def get(self, request, game_id):
        game = get_object_or_404(Game, pk=game_id)
        words = game.words.all()
        serializer = GameWordSerializer(words, many=True)
        return Response(serializer.data)
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("games/<int:game_id>/", views.GameWordsView.as_view(), name="gamewords"),
    path("games/<int:game_id>/words/<int:game_word_id>/toggle/", views.toggle_game_word, name="toggle_game_word"),
    path("games/create/", views.create_game, name="create_game"),
]
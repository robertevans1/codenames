from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("games/<int:game_id>/words/", views.GameWordsView.as_view(), name="gamewords"),
]
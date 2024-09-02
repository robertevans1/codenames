from django.contrib import admin

from .models import Word, Game, GameWord

# Register your models here.
admin.site.register(Word)
admin.site.register(Game)
admin.site.register(GameWord)
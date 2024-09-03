from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import random

class Word(models.Model):
    word = models.CharField(max_length=50)

    def __str__(self):
        return self.word

class Game(models.Model):
    def __str__(self):
        return f"Game {self.id}"
    
class GameWord(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='gamewords')
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    revealed = models.BooleanField(default=False)
    category = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f"{self.word} in {self.game}"
    
    def toggle(self):
        self.revealed = not self.revealed
        self.save()
    
@receiver(post_save, sender=Game)
def create_game_words(sender, instance, created, **kwargs):
    if created:
        all_words = Word.objects.all()
        initial_words = list(all_words.order_by('?')[:25])
        extra= random.choice([['red'], ['blue']])

        categorys = ['red'] * 8 + ['blue'] * 8 + extra + ['neutral'] * 7 + ['black']
        random.shuffle(categorys)

        # Create GameWord instances associated with this Game 
        for word in initial_words:
            gameword = GameWord.objects.create(word=word, game=instance, category=categorys.pop())

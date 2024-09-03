from django.core.management.base import BaseCommand
from codenamesapp.models import Word

class Command(BaseCommand):
    help = 'Import words from wordlist-eng.txt into the Word model'

    def handle(self, *args, **kwargs):
        # Path to your wordlist-eng.txt file
        file_path = '/Users/robevans/Downloads/wordlist-eng.txt'

        with open(file_path, 'r') as file:
            words = file.readlines()

            for line in words:
                word_text = line.strip()  # Remove any leading/trailing whitespace
                if word_text:  # Ensure the line is not empty
                    Word.objects.create(word=word_text)
                    self.stdout.write(self.style.SUCCESS(f'Word "{word_text}" added.'))

        self.stdout.write(self.style.SUCCESS('All words have been imported successfully.'))

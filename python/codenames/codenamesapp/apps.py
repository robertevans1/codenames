from django.apps import AppConfig

import os
import zipfile
import requests

from .word_embedding_data import WordEmbeddingData
from codenames.settings import EMBEDDINGS_URL, ASSETS_DIR, EMBEDDINGS_FILE

class CodenamesappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'codenamesapp'

    def ready(self):
        word_embedding_data = WordEmbeddingData()
        # Check if the file exists
        if not os.path.isfile(file_path):
            print(f'{file_path} does not exist. Downloading and extracting the zip file.')
            
            # Download the zip file
            download_file(zip_url, file_path)
            
            # Extract the zip file
            # extract_zip(zip_path, '/data')
            
            print('Download and extraction complete.')
        else:
            print(f'{file_path} already exists.')

        print_file_paths(file_dir)
        word_embedding_data.load_data(file_path)

# Paths
file_dir = ASSETS_DIR
file_path = f'{file_dir}{EMBEDDINGS_FILE}'
zip_url = EMBEDDINGS_URL

print(f'File Directory: {file_dir}')
print(f'File Path: {file_path}')
print(f'Zip URL: {zip_url}')
#zip_path = f'{file_dir}glove.6B.300d.zip'

def download_file(url, dest_path):
    response = requests.get(url)
    response.raise_for_status()  # Ensure we notice bad responses
    with open(dest_path, 'wb') as file:
        file.write(response.content)

def extract_zip(zip_path, extract_to):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)


def print_file_paths(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            print(os.path.join(root, file))




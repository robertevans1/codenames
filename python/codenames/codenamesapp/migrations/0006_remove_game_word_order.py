# Generated by Django 5.1 on 2024-08-22 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codenamesapp', '0005_alter_gameword_game'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='word_order',
        ),
    ]

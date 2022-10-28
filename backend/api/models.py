from django.db import models

from authentication.models import User

class GameMode(models.Model):
    title = models.CharField(max_length=128)
    desc = models.CharField(max_length=4096)
    link = models.CharField(max_length=128, unique=True)


class Text(models.Model):
    text = models.CharField(max_length=1024)
    gamemode = models.ForeignKey(GameMode, on_delete=models.CASCADE)


class Record(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gamemode = models.ForeignKey(GameMode, on_delete=models.CASCADE)
    text = models.ForeignKey(Text, on_delete=models.CASCADE)
    timems = models.BigIntegerField()

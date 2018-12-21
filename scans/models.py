from django.db import models

# Create your models here.
class Scan(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateTimeField('date made')
    path = models.CharField(max_length=100)

    def __str__(self):
        return self.name

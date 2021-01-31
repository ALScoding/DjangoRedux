from django.db import models

class Flashcard(models.Model):
    frontside = models.CharField(max_length=24)
    backside = models.CharField(max_length=24)
    answer = models.CharField(max_length=44)

    def __str__(self):
        return self.frontside

# class Todo(models.Model):
#     task = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.task
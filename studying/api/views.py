# studying/api/views.py

from rest_framework import viewsets

from .serializers import FlashcardSerializer
from studying.models import Flashcard


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
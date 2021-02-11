# studying/api/views.py

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .serializers import FlashcardSerializer
from studying.models import Flashcard


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [AllowAny]
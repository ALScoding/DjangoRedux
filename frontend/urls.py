# frontend/urls.py

from django.urls import path

from .views import index, FlashcardDetailView, FlashcardDeleteView

urlpatterns = [
    path('', index),
    path('edit/<int:pk>', FlashcardDetailView.as_view(), name='edit_flashcard'),
    path('delete/<int:pk>', FlashcardDeleteView.as_view(), name='delete_flashcard'),
]
# frontend/urls.py

from django.urls import path

from .views import index, FlashcardDetailView, FlashcardDeleteView

urlpatterns = [
    path('', index),
    path('edit/<int:pk>', FlashcardDetailView.as_view()),
    path('delete/<int:pk>', FlashcardDeleteView.as_view()),
]
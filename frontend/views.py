# frontend/views.py

from django.shortcuts import render
from django.views.generic.detail import DetailView

from studying.models import Flashcard


def index(request):
    return render(request, 'frontend/index.html')


class FlashcardDetailView(DetailView):
    model = Flashcard
    template_name = 'frontend/index.html'

class FlashcardDeleteView(DetailView):
    model = Flashcard
    template_name = 'frontend/index.html'
    success_url = reverse_lazy('index')

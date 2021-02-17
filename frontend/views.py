# frontend/views.py

from django.http.response import Http404
from django.shortcuts import render
from django.views.generic.detail import DetailView
from studying.models import Flashcard
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def index(request):
    return render(request, 'frontend/index.html')


class FlashcardDetailView(DetailView):
    model = Flashcard
    template_name = 'frontend/index.html'


class FlashcardDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Flashcard.objects.get(pk=pk)
        except Flashcard.DoesNotExist:
            raise Http404

    def delete(self, request, *args, **kwargs):
        pk=kwargs.get('pk')
        print(request.__dict__)
        flashcard = self.get_object(pk)
        flashcard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
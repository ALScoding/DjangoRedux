import json
from django.shortcuts import (get_object_or_404,
                              render,
                              HttpResponseRedirect)
from django.shortcuts import render

# relative import of forms
from .models import Flashcard
from django.urls import path
from django.http import HttpResponse
# Create your views here.

def load_view(request):
    context = {}
    # loads flashcards.json and creates objects in the database
    # utf-8 encoding fixes problem with using Japanese characters
    if Flashcard.objects.count() == 0:
        with open("flashcards.json", "r", encoding="utf-8") as file:
            data = file.read()
            json_data = json.loads(data)
            context["data"] = "Flash Cards Loaded Successfully"

            for flashcard in json_data.get("cards"):
                Flashcard.objects.create(
                    backside=flashcard.get("backside"),
                    frontside=flashcard.get("frontside"),
                    answer=flashcard.get("answer")
                )

    return HttpResponse('data loaded')
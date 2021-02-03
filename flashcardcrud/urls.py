# flashcardcrud/urls.py

from django.contrib import admin
from django.urls import path, include
from studying.views import load_view

urlpatterns = [
    path('', include('frontend.urls')),
    path('api/', include('studying.api.urls')),
    path('admin/', admin.site.urls),
    path('load/', load_view)
]
# flashcardcrud/urls.py

from django.contrib import admin
from django.urls import path, include
from studying.views import load_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('frontend.urls')),
    path('api/', include ('studying.api.urls')),
    path('admin/', admin.site.urls),
    path('load/', load_view),
    path('api/auth/', include('accounts.api.urls')),
    ]
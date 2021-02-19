from django.urls import path, include

from .views import UserAPIView, RegisterAPIView, LoginAPIView, LogoutAPIView

urlpatterns = [
    path('user', UserAPIView.as_view()),
    path('register', RegisterAPIView.as_view(), name='register'),
    path('login', LoginAPIView.as_view(), name='login'),
    path('logout', LogoutAPIView.as_view(), name='logout')
]

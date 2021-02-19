from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import logout

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.create(user = user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": str(token.key)
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = Token.objects.filter(user = user).first()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": str(token.key)
        })

class LogoutAPIView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(data = {'success': 'successfully logged out'}, status=status.HTTP_200_OK)
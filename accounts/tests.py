from django.http import response
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.urls import reverse
from accounts.api.views import LoginAPIView
from rest_framework.authtoken.models import Token

# Create your tests here.
class LogInTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'user',
            'password': 'password'
        }
        user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user = user)
    def test_login(self):
        # send login data
        path = reverse('login')
        data={'username': 'user', 'password': 'password'}
        request=RequestFactory().post(path, data, content_type='application/json')
        # should be logged in now
        view=LoginAPIView.as_view()
        response=view(request)
        # print(response.__dict__)
        assert response.status_code == 200
        assert response.data == {'user': {'id': 1, 'username': 'user', 'email': ''}, 'token': self.token.key}
from frontend.views import FlashcardDeleteView, FlashcardDetailView
from studying.models import Flashcard
from django.http import response
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.urls import reverse
from accounts.api.views import LoginAPIView, LogoutAPIView, RegisterAPIView
from rest_framework.authtoken.models import Token
from django.test import Client
from rest_framework.test import APIRequestFactory
from studying.api.views import FlashcardViewSet

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

class LogoutTest(TestCase):
    def setUp(self):
        data={'username': 'user', 'email': 'blah@blah.com', 'password': '2J8X5B0A4V'}
        self.user = User.objects.create(**data)
        self.client = Client()
    def testLogout(self):
        self.client.login(username = 'user', password = '2J8X5B0A4V')
        response = self.client.post('/api/auth/logout')
        assert response.status_code == 200
        assert response.data['success'] == 'successfully logged out'

class RegisterTest(TestCase):
    def setUp(self):
        self.path = reverse('register')
    def testSameUsername(self):
        data={'username': 'user', 'email': 'blah@blah.com', 'password': '2J8X5B0A4V'}
        request=RequestFactory().post(self.path, data, content_type='application/json')
        view=RegisterAPIView.as_view()
        response=view(request)
        assert response.status_code == 200
        # use the same username
        request=RequestFactory().post(self.path, data, content_type='application/json')
        view=RegisterAPIView.as_view()
        response=view(request)
        assert response.status_code == 400
    def testBadEmail(self):
        data={'username': 'user', 'email': 'blahblah.com', 'password': 'password'}
        request=RequestFactory().post(self.path, data, content_type='application/json')
        view=RegisterAPIView.as_view()
        response=view(request)
        assert response.status_code == 400
        assert response.exception == True
        # validating the error response, not an email error
        assert response.data['email'] is not None
    def testBadPassword(self):
        data={'username': 'user', 'email': 'blah@blah.com', 'password': 'aaa'}
        request=RequestFactory().post(self.path, data, content_type='application/json')
        view=RegisterAPIView.as_view()
        response=view(request)
        assert response.status_code == 400
        assert response.exception == True
        # validating the error response, not an email error
        assert response.data['password'] is not None    

# Testing ideas:
# Username is already in use by another account
# Sign out after signing in

class FlashcardTest(TestCase):
    def setUp(self):
        testcard = {
            'frontside': 'two',
            'backside': 'plus three',
            'answer': 'five'
        }
        self.newTestCard = Flashcard.objects.create(**testcard)
    def testCreateFail(self):
        data = {
            'frontside': '1234567890123456789012345',
            'backside': '1234567890123456789012345',
            'answer': '123456789012345678901234567890123456789012345'
        }
        path = '/api/studying/'
        request = APIRequestFactory().post(path, data)
        view = FlashcardViewSet.as_view({'post': 'create'})
        response=view(request)
        assert response.exception == True
        assert response.data['frontside'] is not None
        assert response.data['backside'] is not None
        assert response.data['answer'] is not None
        assert response.status_code == 400
    def testCreate(self):
        data2 = {
            'frontside': 'three',
            'backside': 'minus three',
            'answer': 'eight'
        }
        path = '/api/studying/'
        request = APIRequestFactory().post(path, data2)
        view = FlashcardViewSet.as_view({'post': 'create'})
        response=view(request)
        assert response.data['frontside'] == data2['frontside']
        assert response.data['answer'] == data2['answer']
        assert response.status_code == 201
    def testRead(self):
        kwargs={'pk': self.newTestCard.pk}
        path = '/api/studying/'+str(self.newTestCard.pk )
        request = APIRequestFactory().get(path)
        view = FlashcardViewSet.as_view({'get': 'retrieve'})
        response=view(request, **kwargs)
        assert response.status_code == 200
        assert response.data['answer'] == 'five'
    def testUpdate(self):
        kwargs={'pk': self.newTestCard.pk}
        path = '/api/studying/'+str(self.newTestCard.pk )
        request = APIRequestFactory().patch(path, {'answer': 'six'})
        view = FlashcardViewSet.as_view({'patch': 'partial_update'})
        response=view(request, **kwargs)
        assert response.status_code == 200
        assert response.data['answer'] == 'six'
    def testDelete(self):
        kwargs={'pk': self.newTestCard.pk}
        path = reverse('delete_flashcard', kwargs=kwargs)
        request=RequestFactory().delete(path)
        # should be logged in now
        view=FlashcardDeleteView.as_view()
        response=view(request, **kwargs)
        assert response.status_code==204

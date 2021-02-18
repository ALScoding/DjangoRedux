from frontend.views import FlashcardDeleteView, FlashcardDetailView
from studying.models import Flashcard
from django.http import response
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.urls import reverse
from accounts.api.views import LoginAPIView
from rest_framework.authtoken.models import Token

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

# Testing ideas:
# The email address is badly formatted
# Password should be at least X characters
# Email is already in use by another account
# Sign out after signing in

class FlashcardTest(TestCase):
    def setUp(self):
        testcard = {
            'frontside': 'two',
            'backside': 'plus three',
            'answer': 'five'
        }
        self.newTestCard = Flashcard.objects.create(**testcard)
    
    def testCreate(self):
        data = {
            'frontside': 'three',
            'backside': 'minus three',
            'answer': 'eight'
        }
        path = '/api/studying/'
        request = APIRequestFactory().post(path, data)
        view = FlashcardViewSet.as_view({'post': 'create'})
        response=view(request)
        assert response.data['frontside'] == data['frontside']
        assert response.data['answer'] == data['answer']
        assert response.status_code == 201
    def testRead(self):
        pass
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

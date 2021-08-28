from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User

from .views import CustomAuthToken

class TokenAuhTestCase(TestCase):
    USERNAME = 'foo'
    PASSWORD = 'bar'

    def setUp(self):
        user = User.objects.create_user(username=self.USERNAME, password=self.PASSWORD)

    def test_token_can_be_obtained_without_CSRF(self):
        factory = APIRequestFactory()
        request = factory.post('/api/token/', {'username': self.USERNAME, 'password': self.PASSWORD})

        res = CustomAuthToken.as_view()(request)
        self.assertEqual(res.status_code, 200)

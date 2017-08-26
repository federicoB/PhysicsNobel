from django.test import TestCase
from django.urls import reverse
from django.test import Client
from .models import Laureate


# Create your tests here.

class LaureatesTest(TestCase):
    def test_resultNumber(self):
        "test if the number of laureates from the API is more than 200"
        laureates = Laureate.all()
        self.assertTrue(len(laureates) > 200)


class IndexViewTests(TestCase):
    def test_response(self):
        client = Client()
        response = client.get(reverse("index"))
        self.assertEqual(response.status_code, 200)


class LaureateEnpointTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_response_list(self):
        response = self.client.get(reverse("laureate-list"))
        self.assertEqual(response.status_code, 200)

    def test_response_detail(self):
        name = "Albert Einstein"
        response = self.client.get(reverse("laureate-detail", args=[name]))
        self.assertEqual(response.status_code, 200)

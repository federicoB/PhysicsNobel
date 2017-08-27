from django.test import Client
from django.test import TestCase
from django.urls import reverse

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
        self.urlLaureateList = reverse("laureate-list");

    def test_response_list(self):
        response = self.client.get(self.urlLaureateList)
        self.assertEqual(response.status_code, 200)

    def test_response_list_length(self):
        response = self.client.get(self.urlLaureateList)
        self.assertTrue(len(response.json()) > 200)

    def test_unsupported_methods_list(self):
        response = self.client.post(self.urlLaureateList)
        self.assertEqual(response.status_code, 405)
        response = self.client.put(self.urlLaureateList)
        self.assertEqual(response.status_code, 405)
        response = self.client.delete(self.urlLaureateList)
        self.assertEqual(response.status_code, 405)

    def test_response_detail(self):
        name = "Albert Einstein"
        response = self.client.get(reverse("laureate-detail", args=[name]))
        self.assertEqual(response.status_code, 200)


class PrizeEndpointTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.urlPrizeList = reverse("prize-list");

    def test_response_list(self):
        response = self.client.get(self.urlPrizeList)
        self.assertEqual(response.status_code, 200)

    def test_response_list_length(self):
        response = self.client.get(self.urlPrizeList)
        self.assertTrue(len(response.json()) > 100)

    def test_unsupported_methods_list(self):
        response = self.client.post(self.urlPrizeList)
        self.assertEqual(response.status_code, 405)
        response = self.client.put(self.urlPrizeList)
        self.assertEqual(response.status_code, 405)
        response = self.client.delete(self.urlPrizeList)
        self.assertEqual(response.status_code, 405)

    def test_response_detail(self):
        year = "1965"
        response = self.client.get(reverse("prize-detail", args=[year]))
        self.assertEqual(response.status_code, 200)

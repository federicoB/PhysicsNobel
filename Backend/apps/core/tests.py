from django.test import TestCase
from .models import Laureate


# Create your tests here.

class LaureatesTest(TestCase):
    def test_resultNumber(self):
        "test if the number of laureates from the API is more than 200"
        results = Laureate.all()
        self.assertTrue(len(results['results']['bindings']) > 200)

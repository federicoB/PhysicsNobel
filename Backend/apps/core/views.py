from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Laureate, Prize
from .serializer import *


class IndexView(TemplateView):
    template_name = 'index.html'


class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer
    lookup_field = 'name'
    # set regex to accept everything to avoid problems with dot-abbreviated laureates names
    lookup_value_regex = '.*'

    # list method is automatically defined by setting the queryset

    def get_queryset(self):
        '''
        Used get_queryset instead of queryset propery
        for avoiding network request on object declaration
        :return:
        '''
        return Laureate.all()

    def retrieve(self, request, **kwargs):
        laureate = Laureate.get(kwargs.get('name'))
        # context is required for url reversing
        serializer = LaureateDetailSerializer(instance=laureate, context={'request': request})
        return Response(serializer.data)


class PrizeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrizeSerializer
    lookup_field = 'year'

    def get_queryset(self):
        '''
        Used get_queryset instead of queryset propery
        for avoiding network request on object declaration
        :return:
        '''
        return Prize.all()

    def retrieve(self, request, **kwargs):
        prize = Prize.get(kwargs.get('year'))
        serializer = PrizeDetailSerializers(instance=prize, context={'request': request})
        return Response(serializer.data)

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Laureate, Prize
from .serializer import *


class IndexView(TemplateView):
    template_name = 'index.html'


@method_decorator(cache_page(604800), name='dispatch')
class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer
    queryset = Laureate.all()
    lookup_field = 'name'

    # list method is automatically defined by setting the queryset

    def retrieve(self, request, **kwargs):
        laureate = Laureate.get(kwargs.get('name'))
        # context is required for url reversing
        serializer = LaureateDetailSerializer(instance=laureate, context={'request': request})
        return Response(serializer.data)


@method_decorator(cache_page(604800), name='dispatch')
class PrizeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrizeSerializer
    queryset = Prize.all()
    lookup_field = 'year'

    def retrieve(self, request, **kwargs):
        prize = Prize.get(kwargs.get('year'))
        serializer = PrizeDetailSerializers(instance=prize, context={'request': request})
        return Response(serializer.data)

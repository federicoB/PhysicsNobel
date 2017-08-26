from rest_framework import viewsets
from rest_framework.response import Response
from django.views.generic import TemplateView

from .models import Laureate, Prize
from .serializer import LaureateSerializer, \
    LaureateDetailSerializer, PrizeSerializer, PrizeDetailSerializers


class IndexView(TemplateView):
    template_name = 'index.html'

class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer
    queryset = Laureate.all()
    lookup_field = 'name'

    # list method is automatically defined by setting the queryset

    def retrieve(self, request, **kwargs):
        laureate = Laureate.get(kwargs.get('name'))
        serializer = LaureateDetailSerializer(instance=laureate)
        return Response(serializer.data)


class PrizeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrizeSerializer
    queryset = Prize.all()

    def retrieve(self, request, **kwargs):
        prize = Prize.get(kwargs.get('pk'))
        serializer = PrizeDetailSerializers(instance=prize)
        return Response(serializer.data)

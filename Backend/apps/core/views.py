from rest_framework import viewsets
from rest_framework.response import Response

from .models import Laureate, Prize
from .serializer import LaureateSerializer, \
    LaureateDetailSerializer, PrizeSerializer, PrizeDetailSerializers


# Create your views here.

class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer
    queryset = Laureate.all()

    # list method is automatically defined by setting the queryset

    def retrieve(self, request, **kwargs):
        laureate = Laureate.get(kwargs.get('pk'))
        serializer = LaureateDetailSerializer(instance=laureate)
        return Response(serializer.data)


class PrizeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrizeSerializer
    queryset = Prize.all()

    def retrieve(self, request, **kwargs):
        prize = Prize.get(kwargs.get('pk'))
        serializer = PrizeDetailSerializers(instance=prize)
        return Response(serializer.data)

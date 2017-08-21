from rest_framework import viewsets
from rest_framework.response import Response

from .models import Laureate
from .serializer import LaureateSerializer, LaureateDetailSerializer


# Create your views here.

class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer
    queryset = Laureate.all()

    # list method is automatically defined by setting the queryset

    def retrieve(self, request, **kwargs):
        laureate = Laureate.get(kwargs.get('pk'))
        serializer = LaureateDetailSerializer(instance=laureate)
        return Response(serializer.data)

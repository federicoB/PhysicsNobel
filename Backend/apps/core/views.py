from rest_framework.response import Response
from .models import Laureate
from .serializer import LaureateSerializer
from rest_framework import viewsets


# Create your views here.

class LaureateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LaureateSerializer

    def list(self, request, *args, **kwargs):
        queryset = Laureate.all()
        serializer = LaureateSerializer(instance=queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        laureate = Laureate.get(pk)
        serializer = LaureateSerializer(instance=laureate)
        return Response(serializer.data)

    def get_queryset(self):
        return Laureate.all()

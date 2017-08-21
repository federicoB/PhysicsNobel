from rest_framework import serializers


class LaureateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    picture = serializers.CharField(max_length=100)

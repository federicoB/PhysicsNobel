from rest_framework import serializers

class WorkSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = serializers.CharField(max_length=100)
    type = serializers.CharField(max_length=20)
    publishDate = serializers.CharField(max_length=20)
    URL = serializers.URLField(max_length=100)


class LaureateBasicSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)


class LaureateSerializer(LaureateBasicSerializer):
    picture = serializers.URLField(max_length=100)
    prizes = serializers.ListField(
        required=True,
        child=serializers.URLField()
    )

class LaureateDetailSerializer(LaureateSerializer):
    biography = serializers.CharField(max_length=1000)
    works = WorkSerializer(many=True, required=False)


class PrizeSerializer(serializers.Serializer):
    year = serializers.CharField(max_length=10)
    laureates = LaureateBasicSerializer(many=True, required=True)


class PrizeDetailSerializers(PrizeSerializer):
    motivation = serializers.CharField(max_length=100)
    works = WorkSerializer(many=True, required=True)


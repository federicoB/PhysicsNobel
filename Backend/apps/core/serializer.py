from rest_framework import serializers


class WorkSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    URL = serializers.URLField(max_length=100)


class LaureateBasicSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)


class LaureateSerializer(LaureateBasicSerializer):
    picture = serializers.URLField(max_length=100)
    # prizes = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='prize-detail'
    # )
    prizes = serializers.ListField(
        child=serializers.CharField(max_length=10)
    )


class LaureateDetailSerializer(LaureateSerializer):
    biography = serializers.CharField(max_length=1000)
    works = WorkSerializer(many=True, required=False)


class PrizeSerializer(serializers.Serializer):
    year = serializers.CharField(max_length=10)
    laureates = LaureateBasicSerializer(many=True, required=True)

from rest_framework import serializers


class LaureateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    picture = serializers.URLField(max_length=100)
    prizes = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='prize-detail'
    )


class LaureateDetailSerializer(LaureateSerializer):
    biography = serializers.CharField(max_length=1000)

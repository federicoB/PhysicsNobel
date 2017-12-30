from rest_framework import serializers

from django.contrib.auth.models import Permission, Group
from allauth.account.adapter import get_adapter
from allauth.account import app_settings as allauth_settings
from allauth.utils import (email_address_exists, get_username_max_length)
from allauth.account.utils import setup_user_email

class WorkSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
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


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    "A user is already registered with this e-mail address.")
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                "The two password fields didn't match.")
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.groups.add(Group.objects.get(name='public_annotations'))
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

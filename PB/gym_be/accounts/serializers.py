from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from .forms import RegisterForm
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'email', 'avatar']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email')
    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name', 'email', 'avatar', 'phone_num']

    def update(self, instance, validated_data):
        if 'user' in validated_data:
            user = validated_data['user']
            if 'first_name' in user:
                instance.user.first_name = user['first_name']
            if 'last_name' in user:
                instance.user.last_name = user['last_name']
            if 'email' in user:
                instance.user.email = user['email']
            instance.user.save()
            validated_data.pop('user')
        return super().update(instance, validated_data)

class LoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def validate(self, data):
        if 'username' not in data:
            print('no un')
            raise serializers.ValidationError({'username': 'Please enter username'})
        if 'password' not in data:
            print('no pw')
            raise serializers.ValidationError({'password': 'Please enter password'})
        print('doing auth')
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            print('failed auth')
            raise serializers.ValidationError({'details': 'Invalid login credentials'})
        data['user'] = user
        print('returning')
        return data

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(label=_("Confirm password"), write_only=True, style={"input_type": "password"})
    phone_num = serializers.CharField(label=_("Phone number"), required=False)
    avatar = serializers.FileField(label=_("Avatar"), required=False)
    email = serializers.CharField(label=_("Email"), style={"input_type": "email"}, required=False)
    first_name = serializers.CharField(label=_("First Name"), required=True)
    last_name = serializers.CharField(label=_("Last Name"), required=True)

    class Meta:
        model = get_user_model()
        fields = ("username", "password", "password2", "first_name", "last_name", "email", "phone_num", "avatar")

        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "avatar": {"required": False, "null": True, "blank": True},
        }

    def validate(self, data: dict) -> dict:
        data["password1"] = data["password"]
        form = RegisterForm(data=data)
        if form.is_valid():
            return data
        else:
            raise serializers.ValidationError(form.errors)

    def create(self, validated_data: dict) -> get_user_model():
        data = validated_data.copy()
        data["password1"] = data["password"]
        form = RegisterForm(data=data)
        user = form.save(commit=True)
        return user

    def save(self, **kwargs):
        user = self.create(self.validated_data)
        user.save()
        return user

class RestrictedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "first_name", "last_name", "email"]
        read_only_fields = ["username", "first_name", "last_name", "email"]

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from .models import Studio, Images, Amenities

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = ['name', 'quantity']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['image',]

class StudioSerializer(serializers.ModelSerializer):
    images = ImageSerializer(required=False, many=True)
    amenities = AmenitySerializer(required=False, many=True)
    class Meta:
        model = Studio
        fields = ['id', 'name', 'address', 'phone_num', 'images', 'amenities', 'latitude', 'longitude']


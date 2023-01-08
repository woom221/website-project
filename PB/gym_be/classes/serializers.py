from rest_framework import serializers
from .models import Class


class ClassSerializer(serializers.ModelSerializer):
    enrolled_count = serializers.IntegerField(source="enrolled.count", read_only=True)
    coach = serializers.CharField(source='coach.get_full_name')
    studio = serializers.CharField(source='studio.name')
    keywords = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Class
        fields = ['id', 'name', 'description', 'studio', 'keywords', 'coach', 'end_recursion',
                  'capacity', 'enrolled', 'enrolled_count', 'time']

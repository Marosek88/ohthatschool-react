from rest_framework import serializers
from .models import Educator, EducatorSettings

from course.serializers import CourseSerializer


class EducatorSerializer(serializers.ModelSerializer):
    """Educator model serializer."""
    class Meta:
        model = Educator
        fields = '__all__'


class EducatorSettingsSerializer(serializers.ModelSerializer):
    """Educator Settings model serializer."""
    class Meta:
        model = EducatorSettings
        fields = '__all__'

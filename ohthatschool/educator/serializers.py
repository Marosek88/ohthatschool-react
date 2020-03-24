from rest_framework import serializers
from .models import Educator

from course.serializers import CourseSerializer, CategorySerializer


class EducatorSerializer(serializers.ModelSerializer):
    """Educator model serializer."""
    contributing_to_courses = CourseSerializer(required=False, many=True)
    categories = CategorySerializer(required=False, many=True)

    class Meta:
        model = Educator
        fields = '__all__'

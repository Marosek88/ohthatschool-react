from rest_framework import serializers
from .models import Student

from course.serializers import CourseSerializer, CategorySerializer


class StudentSerializer(serializers.ModelSerializer):
    """Student model serializer."""
    courses = CourseSerializer(required=False, many=True)
    categories = CategorySerializer(required=False, many=True)

    class Meta:
        model = Student
        fields = '__all__'

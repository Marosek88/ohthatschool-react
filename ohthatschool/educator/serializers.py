from rest_framework import serializers
from .models import Educator

from accounts.serializers import UserProfileSerializer
from course.serializers import CourseSerializer, CategorySerializer
from student.serializers import StudentSerializer


class EducatorSerializer(serializers.ModelSerializer):
    """Educator model serializer."""
    contributing_to_courses = CourseSerializer(required=False, many=True)
    categories = CategorySerializer(required=False, many=True)
    students = StudentSerializer(required=False, many=True)

    class Meta:
        model = Educator
        fields = '__all__'

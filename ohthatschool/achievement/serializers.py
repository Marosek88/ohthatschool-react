from rest_framework import serializers
from .models import Achievement

from course.serializers import CourseSerializer
from educator.serializers import EducatorSerializer
from student.serializers import StudentSerializer
from parent.serializers import ParentSerializer


class AchievementSerializer(serializers.ModelSerializer):
    """Achievement model serializer."""
    related_course = CourseSerializer(required=False)
    related_educator = EducatorSerializer(required=False)
    related_student = StudentSerializer(required=False)
    related_parent = ParentSerializer(required=False)

    class Meta:
        model = Achievement
        fields = '__all__'

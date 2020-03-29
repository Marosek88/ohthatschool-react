from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Student
from .serializers import StudentSerializer
from educator.serializers import EducatorSerializer
from course.serializers import CourseSerializer
from .documents import StudentDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- STUDENT -------------------------------------------------
class StudentViewSet(ElasticModelViewSet):
    """Student viewset"""
    queryset = Student.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer
    es_document_class = StudentDocument
    model_class = Student


# ------------------------------------------------- STUDENT USER -------------------------------------------------
class StudentUserViewSet(ElasticModelViewSet):
    """Student User viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StudentSerializer
    es_document_class = StudentDocument
    model_class = Student

    def get_queryset(self):
        result = Student.objects.filter(id=self.request.user.id)
        return result

    def perform_create(self, serializer):
        serializer.save(id=self.request.user)

    @action(detail=False, methods=['GET'])
    def get_courses(self, request):
        courses = request.user.student.courses
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, 200)

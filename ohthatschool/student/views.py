from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Student, StudentCourse, StudentModule, StudentLesson

from .serializers import StudentSerializer, StudentCourseSerializer, StudentModuleSerializer, StudentLessonSerializer
from educator.serializers import EducatorSerializer
from course.serializers import CourseSerializer

from .documents import StudentDocument, StudentCourseDocument, StudentModuleDocument, StudentLessonDocument

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
        serializer.save(id=self.request.user.user_profile)

    @action(detail=False, methods=['GET'])
    def get_courses(self, request):
        courses = request.user.student.courses
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, 200)


# ------------------------------------------------- STUDENT COURSE -------------------------------------------------
class StudentCourseViewSet(ElasticModelViewSet):
    """Student Course viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StudentCourseSerializer
    es_document_class = StudentCourseDocument
    model_class = StudentCourse

    def get_queryset(self):
        result = StudentCourse.objects.filter(student=self.request.user.id)
        return result

    def perform_create(self, serializer):


        serializer.save(student=self.request.user.student)

    @action(detail=True, methods=['GET'])
    def get_modules(self, request):
        modules = self.get_object().modules
        serializer = CourseSerializer(modules, many=True)
        return Response(serializer.data, 200)

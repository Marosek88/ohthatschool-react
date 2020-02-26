from rest_framework import viewsets, permissions
from rest_framework.response import Response
from elasticsearch_dsl import Q
import uuid

from .models import Category, Course, Module, Lesson
from .serializers import CategorySerializer, CourseSerializer, ModuleSerializer, LessonSerializer
from .documents import CategoryDocument, CourseDocument, ModuleDocument, LessonDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- CATEGORY -------------------------------------------------
class CategoryViewSet(ElasticModelViewSet):
    """Category viewset"""
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer
    es_document_class = CategoryDocument
    model_class = Category


# ------------------------------------------------- COURSE EVERYONE -------------------------------------------------
class CourseViewSet(ElasticModelViewSet):
    """Course viewset for public access"""
    queryset = Course.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course

    """Any modify functions are disabled"""
    def create(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, pk=None, *args, **kwargs):
        pass

    def destroy(self, request, pk=None, *args, **kwargs):
        pass


# ------------------------------------------------- COURSE EDUCATOR -------------------------------------------------
class CourseEducatorViewSet(ElasticModelViewSet):
    """Educator's Course viewset"""
    # queryset = Course.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course

    def get_queryset(self):
        return self.request.user.courses.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# ------------------------------------------------- COURSE STUDENT -------------------------------------------------
class CourseStudentViewSet(ElasticModelViewSet):
    """Student's Course viewset"""
    # queryset = Course.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer
    es_document_class = CourseDocument
    model_class = Course


# ------------------------------------------------- MODULE -------------------------------------------------
class ModuleViewSet(ElasticModelViewSet):
    """Module viewset"""
    queryset = Module.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ModuleSerializer
    es_document_class = ModuleDocument
    model_class = Module


# ------------------------------------------------- LESSON -------------------------------------------------
class LessonViewSet(ElasticModelViewSet):
    """Lesson viewset"""
    queryset = Lesson.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LessonSerializer
    es_document_class = LessonDocument
    model_class = Lesson

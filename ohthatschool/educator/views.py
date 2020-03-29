from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Educator
from .serializers import EducatorSerializer
from student.serializers import StudentSerializer
from .documents import EducatorDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- EDUCATOR -------------------------------------------------
class EducatorViewSet(ElasticModelViewSet):
    """Educator viewset"""
    queryset = Educator.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EducatorSerializer
    es_document_class = EducatorDocument
    model_class = Educator


# ------------------------------------------------- EDUCATOR USER -------------------------------------------------
class EducatorUserViewSet(ElasticModelViewSet):
    """Educator User viewset"""
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = EducatorSerializer
    es_document_class = EducatorDocument
    model_class = Educator

    def get_queryset(self):
        result = Educator.objects.filter(id=self.request.user.id)
        return result

    def perform_create(self, serializer):
        serializer.save(id=self.request.user)

    @action(detail=False, methods=['GET'])
    def get_students(self, request):
        students = request.user.educator.students
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, 200)

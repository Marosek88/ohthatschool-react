from rest_framework import viewsets, permissions
from rest_framework.response import Response
from elasticsearch_dsl import Q

from .models import Educator, EducatorSettings
from .serializers import EducatorSerializer, EducatorSettingsSerializer
from .documents import EducatorDocument, EducatorSettingsDocument

from misc.classes import ElasticModelViewSet


# ------------------------------------------------- CATEGORY -------------------------------------------------
class EducatorViewSet(ElasticModelViewSet):
    """Educator viewset"""
    queryset = Educator.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EducatorSerializer
    es_document_class = EducatorDocument
    model_class = Educator


# ------------------------------------------------- COURSE -------------------------------------------------
class EducatorSettingsViewSet(ElasticModelViewSet):
    """Course viewset"""
    queryset = EducatorSettings.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EducatorSettingsSerializer
    es_document_class = EducatorSettingsDocument
    model_class = EducatorSettings

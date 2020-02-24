from django.db import models
from django.contrib.auth.models import User
# from django.contrib.postgres.fields import JSONField
import uuid


class Category(models.Model):
    """Course Category Django model"""
    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=False, blank=False, max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'Category: {self.name}'


class Course(models.Model):
    """Course Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100, unique=True)
    owner = models.ForeignKey(User, related_name='courses', null=True, on_delete=models.SET_NULL)
    categories = models.ManyToManyField(Category, related_name='courses')

    def __str__(self):
        return f'Course: {self.title}'


class Module(models.Model):
    """Module Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100)
    course = models.ForeignKey(Course, related_name='modules', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'Module: {self.title}'


class Lesson(models.Model):
    """Lesson Django model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(null=False, blank=False, max_length=100)
    course = models.ForeignKey(Module, related_name='lessons', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'Lesson: {self.title}'

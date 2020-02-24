from django.db import models
from django.contrib.auth.models import User

from student.models import Student


class Parent(models.Model):
    """Parent Django model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    children = models.ManyToManyField(Student, related_name='parents')

    def __str__(self):
        return f'Parent: {self.user.username}'

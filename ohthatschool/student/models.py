from django.db import models
from django.contrib.auth.models import User

from course.models import Course


class Student(models.Model):
    """Student Django model"""
    id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    courses = models.ManyToManyField(Course, related_name='students')

    def __str__(self):
        return f'Student: {self.user.username}'

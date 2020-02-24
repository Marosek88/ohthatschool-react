from django.db import models
from django.contrib.auth.models import User

from course.models import Course


class Educator(models.Model):
    """Educator Django model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    contributing_to = models.ManyToManyField(Course, related_name='contributors')
    achievements = models

    def __str__(self):
        return f'Educator: {self.user.username}'

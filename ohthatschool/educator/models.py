from django.db import models
from django.contrib.auth.models import User

from course.models import Course


class Educator(models.Model):
    """Educator Django model"""
    id = models.OneToOneField(User, related_name='educator', on_delete=models.CASCADE, primary_key=True)
    contributing_to_courses = models.ManyToManyField(Course, related_name='contributors', blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'Educator: {self.user.username}'


class EducatorSettings(models.Model):
    """Educator Settings Django model"""
    id = models.OneToOneField(Educator, related_name='settings', on_delete=models.CASCADE, primary_key=True)
    show_in_listings = models.BooleanField(default=True)
    local_connect = models.BooleanField(default=True)

    def __str__(self):
        return f'Educator Settings: {self.educator_profile.user.username}'

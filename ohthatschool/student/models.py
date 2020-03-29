from django.db import models
from django.contrib.auth.models import User

from course.models import Category, Course


class Student(models.Model):
    """Student Django model"""
    id = models.OneToOneField(User, related_name='student', on_delete=models.CASCADE, primary_key=True)
    courses = models.ManyToManyField(Course, related_name='students')
    categories = models.ManyToManyField(Category, related_name='students', blank=True)
    active = models.BooleanField(default=True)
    show_in_listings = models.BooleanField(default=True)
    local_connect = models.BooleanField(default=True)
    online_connect = models.BooleanField(default=True)

    def __str__(self):
        return f'Student: {self.id.username}'

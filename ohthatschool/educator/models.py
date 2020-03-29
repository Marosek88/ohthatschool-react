from django.db import models
from django.contrib.auth.models import User

from course.models import Course, Category
from student.models import Student


class Educator(models.Model):
    """Educator Django model"""
    id = models.OneToOneField(User, related_name='educator', on_delete=models.CASCADE, primary_key=True)
    categories = models.ManyToManyField(Category, related_name='educators', blank=True)
    contributing_to_courses = models.ManyToManyField(Course, related_name='contributors', blank=True)
    students = models.ManyToManyField(Student, related_name='students', blank=True)
    active = models.BooleanField(default=True)
    show_in_listings = models.BooleanField(default=True)
    local_connect = models.BooleanField(default=True)
    online_connect = models.BooleanField(default=True)

    def __str__(self):
        return f'Educator: {self.id.username}'

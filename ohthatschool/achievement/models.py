from django.db import models
from django.utils.translation import gettext_lazy as _

import uuid

from course.models import Course
from educator.models import Educator
from parent.models import Parent
from student.models import Student


class Achievement(models.Model):
    """Achievement Django model"""
    class TypeChoices(models.TextChoices):
        FROM_STUDENT_TO_COURSE = "FSTC", _("FROM_STUDENT_TO_COURSE")
        FROM_STUDENT_TO_EDUCATOR = "FSTE", _("FROM_STUDENT_TO_EDUCATOR")
        FROM_PARENT_TO_EDUCATOR = "FPTE", _("FROM_PARENT_TO_EDUCATOR")
        FROM_EDUCATOR_TO_STUDENT = "FETS", _("FROM_EDUCATOR_TO_STUDENT")
        FROM_COURSE_TO_STUDENT = "FCTS", _("FROM_COURSE_TO_STUDENT")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=False, blank=False, max_length=100)
    related_course = models.OneToOneField(Course, related_name='achievements', null=True, on_delete=models.SET_NULL)
    related_educator = models.OneToOneField(Educator, related_name='achievements', null=True, on_delete=models.SET_NULL)
    related_parent = models.OneToOneField(Parent, related_name='achievements', null=True, on_delete=models.SET_NULL)
    related_student = models.OneToOneField(Student, related_name='achievements', null=True, on_delete=models.SET_NULL)
    type = models.CharField(null=False, blank=False, max_length=4, choices=TypeChoices.choices)
    image = models.ImageField(null=True)

    def __str__(self):
        return f'Student: {self.name}'

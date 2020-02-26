from django.contrib import admin

# Register your models here.
from .models import Educator, EducatorSettings

admin.site.register(Educator)
admin.site.register(EducatorSettings)

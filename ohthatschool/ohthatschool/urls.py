from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),  # Needs to be on top
    # path('', include('achievement.urls')),
    # path('', include('connect.urls')),
    path('', include('course.urls')),
    path('', include('educator.urls')),
    # path('', include('parent.urls')),
    # path('', include('student.urls')),
    path('', include('website.urls')),
]

from rest_framework import routers
from .views import StudentViewSet, StudentUserViewSet

router = routers.DefaultRouter()
router.register('api/student/student', StudentViewSet, 'student-student')
router.register('api/student/student-user', StudentUserViewSet, 'student-user')

urlpatterns = router.urls

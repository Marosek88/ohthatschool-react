from rest_framework import routers
from .views import CategoryViewSet, CourseViewSet, ModuleViewSet, LessonViewSet

router = routers.DefaultRouter()
router.register('api/course/category', CategoryViewSet, 'course-category')
router.register('api/course/course', CourseViewSet, 'course-course')
router.register('api/course/module', ModuleViewSet, 'course-module')
router.register('api/course/lesson', LessonViewSet, 'course-lesson')

urlpatterns = router.urls

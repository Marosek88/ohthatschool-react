from rest_framework import routers
from .views import EducatorViewSet, EducatorSettingsViewSet

router = routers.DefaultRouter()
router.register('api/educator/educator', EducatorViewSet, 'educator-educator')
router.register('api/educator/settings', EducatorSettingsViewSet, 'educator-settings')

urlpatterns = router.urls

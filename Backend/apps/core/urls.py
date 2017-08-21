from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from apps.core.views import LaureateViewSet

router = DefaultRouter()
router.register(r'laureates', LaureateViewSet, base_name='laureates')

urlpatterns = [
    url(r'^', include(router.urls))
]

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from apps.core.views import LaureateViewSet, PrizeViewSet

router = DefaultRouter()
router.register(r'laureates', LaureateViewSet, base_name='laureates')
router.register(r'prizes', PrizeViewSet, base_name='prizes')

urlpatterns = [
    url(r'^', include(router.urls))
]

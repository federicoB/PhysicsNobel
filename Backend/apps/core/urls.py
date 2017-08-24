from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from apps.core.views import LaureateViewSet, PrizeViewSet, IndexView

router = DefaultRouter()
#register routes for laureates object. 'laureates' will also be the base name for naming views.
router.register(r'laureates', LaureateViewSet,base_name='laureates')
router.register(r'prizes', PrizeViewSet, base_name='prizes')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^.*$', IndexView.as_view())
]

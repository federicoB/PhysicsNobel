from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from apps.core.views import LaureateViewSet, PrizeViewSet, \
    IndexView

router = DefaultRouter()
# register routes for laureates object. 'laureates' will also be the base name for naming views.
router.register(prefix=r'laureates', viewset=LaureateViewSet, base_name='laureate')
router.register(prefix=r'prizes', viewset=PrizeViewSet, base_name='prize')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^.*$', IndexView.as_view(), name="index")
]

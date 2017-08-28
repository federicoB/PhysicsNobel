from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from annotator_store import views as annotator_views

from apps.core.views import LaureateViewSet, PrizeViewSet, \
    IndexView

router = DefaultRouter()
# register routes for laureates object. 'laureates' will also be the base name for naming views.
router.register(r'laureates', LaureateViewSet, base_name='laureate')
router.register(r'prizes', PrizeViewSet, base_name='prize')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    # annotations
    url(r'^annotations/api/', include('annotator_store.urls', namespace='annotation-api')),
    # annotatorjs doesn't handle trailing slash in api prefix url
    url(r'^annotations/api', annotator_views.AnnotationIndex.as_view(), name='annotation-api-prefix'),
    url(r'^.*$', IndexView.as_view(), name="index")
]

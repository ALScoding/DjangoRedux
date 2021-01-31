# studying/api/urls.py

from rest_framework import routers

from .views import FlashcardViewSet

router = routers.DefaultRouter()
router.register('studying', FlashcardViewSet, 'studying')
# router.register('<The URL prefix>', <The viewset class>, '<The URL name>')

urlpatterns = router.urls
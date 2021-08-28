from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'notes', views.NotesViewSet)
router.register(r'user', views.UserViewSet)

'''
@csrf_exempt
def my_obtain_auth_token(request):
    return obtain_auth_token(request)
'''

urlpatterns = [
    path('', include(router.urls)),
    #path('token/', my_obtain_auth_token),
    path('token/', views.CustomAuthToken.as_view())
]

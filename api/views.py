from rest_framework import viewsets, generics, views, mixins
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import permission_classes, action
from rest_framework.request import Request
from rest_framework.response import Response

from . import models
from .serializer import NotesSerializer, UserSerializer
from api import serializer

class NotesViewSet(viewsets.ModelViewSet):
    queryset = models.Note.objects.all()
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_queryset(self):
        return models.Note.objects.filter(owner=self.request.user).all()

    def perform_create(self, serializer: NotesSerializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.GenericViewSet, generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = models.User.objects.all()
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_permissions(self):
        if (self.action == 'create'):
            permission_classes = []
        else:
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]

    def list(self, request: Request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

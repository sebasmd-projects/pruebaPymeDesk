from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from apps.users.models import UserModel
from apps.users.api.serializers import UserModelSerializer

from utils.default_pagination import DefaultPaginationSerializer


class GeneralUserModelAPIView():
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = DefaultPaginationSerializer


class ListUserModelAPIView(GeneralUserModelAPIView, ListAPIView):
    pass


class CreateUserModelAPIView(GeneralUserModelAPIView, CreateAPIView):
    pass


class RetrieveUpdateDestroyUserModelAPIView(GeneralUserModelAPIView, RetrieveUpdateDestroyAPIView):
    pass

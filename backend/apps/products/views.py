from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from apps.products.models import ProductModel
from apps.products.api.serializers import ProductModelSerializer

from utils.default_pagination import DefaultPaginationSerializer


class ProductModelViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer
    pagination_class = DefaultPaginationSerializer

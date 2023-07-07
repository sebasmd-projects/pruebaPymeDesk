from rest_framework.viewsets import ModelViewSet

from apps.products.models import ProductModel
from apps.products.api.serializers import ProductModelSerializer

from utils.default_pagination import DefaultPaginationSerializer


class ProductModelViewSet(ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer
    pagination_class = DefaultPaginationSerializer
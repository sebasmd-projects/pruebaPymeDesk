from rest_framework import serializers
from apps.products.models import ProductModel


class ProductModelSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'stock', 'price',
                  'description', 'created', 'updated']

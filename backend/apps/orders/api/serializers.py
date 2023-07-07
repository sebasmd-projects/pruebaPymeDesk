from rest_framework import serializers

from apps.users.api.serializers import UserModelSerializer
from apps.orders.models import OrderDetailsModel, OrderModel
from apps.products.api.serializers import ProductModelSerializer


class OrderDetailsModelSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()
    product = ProductModelSerializer()

    class Meta:
        model = OrderDetailsModel
        fields = ['id', 'product', 'product_order',
                  'amount', 'created', 'updated']


class OrderModelSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()
    products = serializers.SerializerMethodField()

    class Meta:
        model = OrderModel
        fields = ('id', 'client', 'date_order', 'state', 'paid',
                  'shipping_rule', 'observations', 'products', 'created', 'updated')

    def get_products(self, obj):
        order_details = obj.orderdetailsmodel_set.all()
        return OrderDetailsModelSerializer(order_details, many=True).data


class SummarySerializer(serializers.Serializer):
    num_orders = serializers.IntegerField()

    num_customers = serializers.IntegerField()

    income_last_month = serializers.DecimalField(
        max_digits=10, decimal_places=2
    )

    income_current_month = serializers.DecimalField(
        max_digits=10, decimal_places=2
    )

    city_more_orders = serializers.SerializerMethodField()

    best_selling_product = serializers.SerializerMethodField()

    total_sales_last_month = serializers.DecimalField(
        max_digits=10, decimal_places=2
    )

    total_sales_current_month = serializers.DecimalField(
        max_digits=10, decimal_places=2
    )

    def get_city_more_orders(self, obj):
        if obj["city_more_orders"]:
            return obj["city_more_orders"]["client__city"]
        return None

    def get_best_selling_product(self, obj):
        if obj["best_selling_product"]:
            return obj["best_selling_product"]["products__name"]
        return None

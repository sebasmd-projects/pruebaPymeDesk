from import_export import resources

from apps.orders.models import OrderModel, OrderDetailsModel

class OrderModelResource(resources.ModelResource):

    class Meta:
        model = OrderModel

        fields = (
            "id",
            "client",
            "date_order",
            "state",
            "paid",
            "shipping_rule",
            "observations",
            "products"
        )

        skip_unchanged = True


class OrderDetailsModelResource(resources.ModelResource):

    class Meta:
        model = OrderDetailsModel

        fields = (
            "id",
            "product",
            "product_order",
            "amount",
            "order"
        )

        skip_unchanged = True
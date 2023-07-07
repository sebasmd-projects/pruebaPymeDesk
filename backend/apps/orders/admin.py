from django.contrib import admin

from import_export.admin import ImportExportActionModelAdmin

from apps.orders.models import OrderModel, OrderDetailsModel
from apps.orders.admin_resources import OrderDetailsModelResource, OrderModelResource


class OrderDetailsModelInline(admin.TabularInline):
    model = OrderDetailsModel
    extra = 1
    readonly_fields = ('created',)


@admin.register(OrderModel)
class OrderModelAdmin(ImportExportActionModelAdmin, admin.ModelAdmin):
    resource_class = OrderModelResource

    inlines = [OrderDetailsModelInline]

    order_model_list = (
        "id",
        "client",
        "date_order",
        "state",
        "paid",
        "shipping_rule"
    )

    list_display = (
        *order_model_list,
    )

    list_display_links = (
        *order_model_list,
    )

    fieldsets = (
        (
            "Order info", {
                "fields": (
                    "state",
                    "paid",
                    "shipping_rule",
                    "date_order",
                    "observations"
                )
            }
        ),
        (
            "Client info", {
                "fields": (
                    "client",
                )
            }
        )
    )

    readonly_fields = (
        "created",
        "updated",
        "date_order"
    )


@admin.register(OrderDetailsModel)
class OrderDetailsModelAdmin(ImportExportActionModelAdmin, admin.ModelAdmin):
    resource_class = OrderDetailsModelResource

    order_detail_model_list = (
        "id",
        "product",
        "product_order",
        "amount"
    )

    list_display = (
        *order_detail_model_list,
    )

    list_display_links = (
        *order_detail_model_list,
    )

    readonly_fields = (
        "created",
        "updated",
        "product_order"
    )

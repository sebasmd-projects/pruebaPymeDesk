from django.contrib import admin

from import_export.admin import ImportExportActionModelAdmin

from apps.products.models import ProductModel
from apps.products.admin_resources import ProductModelResource


@admin.register(ProductModel)
class ProductModelAdmin(ImportExportActionModelAdmin, admin.ModelAdmin):
    resource_class = ProductModelResource

    product_model_list = (
        "id",
        "name",
        "stock",
        "price"
    )

    list_display = (
        *product_model_list,
    )

    list_display_links = (
        *product_model_list,
    )

    ordering = (
        *product_model_list,
    )

    fieldsets = (
        (
            "Product info", {
                "fields": (
                    "name",
                    "stock",
                    "price",
                    "description"
                )
            }
        ),
        (
            "Product position", {
                "fields": (
                    "order",
                )
            }
        ),
        (
            None, {
                "fields": (
                    "created",
                    "updated"
                )
            }
        ),
    )

    readonly_fields = (
        "created",
        "updated"
    )

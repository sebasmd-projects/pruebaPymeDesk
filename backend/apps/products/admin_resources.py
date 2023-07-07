from import_export import resources

from apps.products.models import ProductModel

class ProductModelResource(resources.ModelResource):

    class Meta:
        model = ProductModel

        fields = (
            "id",
            "product",
            "stock",
            "price",
            "description"
        )

        skip_unchanged = True
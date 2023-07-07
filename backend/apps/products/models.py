from django.db import models
from django.utils import timezone

class GeneralModel(models.Model):
    created = models.DateTimeField(
        "created", default=timezone.now
    )

    updated = models.DateTimeField(
        "updated", auto_now=True
    )

    order = models.PositiveIntegerField(
        "order (sort)", default=1, blank=True, null=True
    )

    class Meta:
        abstract = True

class ProductModel(GeneralModel):
    name = models.CharField(
        "product", max_length=50
    )

    stock = models.IntegerField(
        "stock"
    )

    price = models.FloatField(
        "price"
    )

    description = models.TextField(
        "description"
    )

    class Meta:
        db_table = "apps_product"
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["order", "id", "name"]

    def save(self, *args, **kwargs):
        self.name = self.name.title()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.id} - {self.name}"
from django.db import models
from django.utils import timezone

from apps.users.models import UserModel
from apps.products.models import ProductModel


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


class OrderModel(GeneralModel):
    STATE_CHOICES = (
        ('pending', 'Pendiente'),
        ('in_route', 'En Ruta'),
        ('delivered', 'Entregado'),
        ('cancelled', 'Cancelado')
    )

    SHIPPING_RULE = (
        ('home_delivery', 'Domicilio'),
        ('home_pick_up', 'Recoger')
    )

    client = models.ForeignKey(
        UserModel, on_delete=models.CASCADE
    )

    date_order = models.DateField(
        auto_now_add=True
    )

    state = models.CharField(
        max_length=20, choices=STATE_CHOICES
    )

    paid = models.BooleanField(
        default=False
    )

    shipping_rule = models.CharField(
        max_length=20, choices=SHIPPING_RULE
    )

    observations = models.TextField(
        blank=True, null=True
    )

    products = models.ManyToManyField(
        ProductModel, through='OrderDetailsModel'
    )

    class Meta:
        db_table = "apps_order"
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        ordering = ["order"]

    def __str__(self) -> str:
        return f"id: {self.id} - client: {self.client}"  # type: ignore


class OrderDetailsModel(GeneralModel):
    product = models.ForeignKey(
        ProductModel, on_delete=models.CASCADE
    )
    product_order = models.ForeignKey(
        OrderModel, on_delete=models.CASCADE
    )
    amount = models.IntegerField()

    class Meta:
        db_table = "apps_order_details"
        verbose_name = "Order details"
        verbose_name_plural = "Orders Details"
        ordering = ["order"]

    def __str__(self) -> str:
        return f"id: {self.id} - product: {self.product}"

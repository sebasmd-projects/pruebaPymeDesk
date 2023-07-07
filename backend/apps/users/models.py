from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

from apps.users.managers import UserManager


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


class UserModel(GeneralModel, AbstractUser):
    date_joined = None

    phone = models.CharField(
        "phone", max_length=25
    )

    city = models.CharField(
        "city", max_length=50
    )

    address = models.CharField(
        "address", max_length=100
    )

    objects = UserManager()

    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    class Meta:
        db_table = "apps_user"
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["order", "id", "first_name", "last_name"]

    def save(self, *args, **kwargs):
        self.first_name = self.first_name.title()
        self.last_name = self.last_name.title()
        self.username = self.username.lower()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.id} - {self.first_name} {self.last_name}"

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from import_export.admin import ImportExportActionModelAdmin

from apps.users.models import UserModel
from apps.users.admin_resources import UserModelResource


@admin.register(UserModel)
class UserModelAdmin(ImportExportActionModelAdmin, UserAdmin):
    resource_class = UserModelResource

    list_display = (
        "order",
        "id",
        "get_full_name",
        "email",
        "username",
        "is_staff"
    )

    list_display_links = (
        "id",
        "get_full_name",
        "email",
        "username",
        "username"
    )

    ordering = (
        "order",
        "id",
        "email",
        "first_name",
        "last_name"
    )

    fieldsets = (
        (
            "User info", {
                "fields": (
                    "username",
                    "password"
                )
            }
        ),
        (
            "Personal info", {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "phone",
                    "city",
                    "address"
                )
            }
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (
            "Important dates", {
                "fields": (
                    "last_login",
                    "created",
                    "updated"
                )
            }
        ),
        (
            "Order", {
                "fields": (
                    "order",
                )
            }
        ),
    )

    readonly_fields = (
        "get_full_name",
        "last_login",
        "created",
        "updated"
    )

    def get_full_name(self, obj):
        return obj.get_full_name()

    get_full_name.short_description = "Full name"

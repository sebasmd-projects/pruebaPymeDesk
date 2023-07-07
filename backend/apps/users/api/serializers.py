from rest_framework import serializers

from apps.users.models import UserModel


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "phone",
            "city",
            "address",
            "is_staff",
            "is_active",
            "is_superuser",
            "groups",
            "user_permissions",
            "created",
            "updated",
            "last_login",
        )

        read_only_fields = (
            "id",
            "last_login",
            "created",
            "updated",
            "is_staff",
            "is_active",
            "is_superuser",
            "groups",
            "user_permissions"
        )

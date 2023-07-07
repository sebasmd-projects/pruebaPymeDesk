from django.contrib.auth.hashers import make_password

from import_export import resources

from apps.users.models import UserModel

class UserModelResource(resources.ModelResource):
    def before_import_row(self, row, *args, **kwargs):
        row["username"] = row["username"].lower()
        row["first_name"] = row["first_name"].title()
        row["last_name"] = row["last_name"].title()

        password = row["password"]

        if "pbkdf2" not in row['password']:
            row["password"] = make_password(password)

    class Meta:
        model = UserModel
        
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "groups",
            "user_permissions",
            "is_superuser",
            "is_staff",
            "is_active",
            "phone",
            "city",
            "address"
        )
        
        skip_unchanged = True
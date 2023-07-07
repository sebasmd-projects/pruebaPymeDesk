from django.contrib.auth.backends import BaseBackend

from apps.users.models import UserModel


class EmailOrUsernameModelBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, *args, **kwargs):
        kwargs = {'email': username} if '@' in username else {'username': username} # type: ignore
        try:
            user = UserModel.objects.get(**kwargs)
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

from drf_yasg.utils import swagger_auto_schema

from rest_framework import status

from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from app_core.serializers import (
    TokenObtainPairResponseSerializer,
    TokenRefreshResponseSerializer,
    TokenVerifyResponseSerializer,
    TokenBlacklistResponseSerializer
)

from utils.auth_backend import EmailOrUsernameModelBackend


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        username_or_email = request.data.get('username')

        backend = EmailOrUsernameModelBackend()
        user = backend.authenticate(
            request, username=username_or_email, password=request.data.get('password'))
        if user:
            response.data['user_id'] = user.id
            response.data['user_name'] = user.username
            response.data['first_name'] = user.first_name
            response.data['last_name'] = user.last_name
            response.data['email'] = user.email

        return response


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            response.data['detail'] = "Token is valid"
            response.data['code'] = "token_is_valid"

        return response


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

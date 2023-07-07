"""
URL configuration for app_core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from app_core.views import (
    DecoratedTokenObtainPairView,
    DecoratedTokenRefreshView,
    DecoratedTokenVerifyView
)

from apps.orders.api.views import (
    SummaryView,
    OrderModelViewSet
)

from apps.products.api.views import ProductModelViewSet

from apps.users.api.views import (
    ListUserModelAPIView,
    CreateUserModelAPIView,
    RetrieveUpdateDestroyUserModelAPIView,
)

urlpatterns = []

router = DefaultRouter()

router.register(
    r"api/orders",
    OrderModelViewSet,
    basename="detail-orders"
)

router.register(
    r"api/products",
    ProductModelViewSet,
    basename="products"
)

schema_view = get_schema_view(
    openapi.Info(
        title="Pruebatécnica PymeDesk- ApiDoc",
        default_version='v1.0.0',
        description="Documentación de las API",
        terms_of_service=f"https://pymedesk.com/",
        contact=openapi.Contact(email="tecnologia@pymedesk.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=False,
    permission_classes=(permissions.IsAuthenticated,),
)

admin_path = [
    path('admin/', admin.site.urls),
]

third_party_paths = [
    path("__debug__/", include("debug_toolbar.urls")),
    path('accounts/', include('rest_framework.urls')),
    path('api/docs/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('api/redocs/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
    path('api/docs/<format>/',
         schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/token/', DecoratedTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', DecoratedTokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/token/verify/', DecoratedTokenVerifyView.as_view(), name='token_verify'),
]


local_apps_paths = [
    path(
        'api/summary/',
        SummaryView.as_view(),
        name="summary"
    ),
    path(
        'api/users/',
        ListUserModelAPIView.as_view(),
        name="users"
    ),
    path(
        'api/users/create/',
        CreateUserModelAPIView.as_view(),
        name="users-create"
    ),
    path(
        'api/users/<pk>/',
        RetrieveUpdateDestroyUserModelAPIView.as_view(),
        name="users-rud"
    )
]

urlpatterns += router.urls + admin_path + third_party_paths + local_apps_paths + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

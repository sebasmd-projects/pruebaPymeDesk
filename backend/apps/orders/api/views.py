from datetime import date, timedelta
from django.db.models import Count, F, Sum, ExpressionWrapper, DecimalField

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from utils.default_pagination import DefaultPaginationSerializer

from apps.orders.models import OrderModel, OrderDetailsModel


from apps.orders.api.serializers import (
    SummarySerializer,
    OrderModelSerializer,
    #
    OrderCreateSerializer
)


class GeneralOrderModelAPIView():
    queryset = OrderModel.objects.all()
    pagination_class = DefaultPaginationSerializer


class CreateOrderModelAPIView(GeneralOrderModelAPIView, CreateAPIView):
    serializer_class = OrderCreateSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_data = serializer.validated_data

        order = OrderModel.objects.create(
            state=order_data['state'],
            paid=order_data['paid'],
            shipping_rule=order_data['shipping_rule'],
            observations=order_data['observations'],
            client=order_data['client']
        )

        details_data = order_data['details']

        for detail_data in details_data:
            OrderDetailsModel.objects.create(
                product=detail_data['product'],
                product_order=order,
                amount=detail_data['amount']
            )

        return Response(serializer.data, status=HTTP_201_CREATED)


class ListOrderModelAPIView(GeneralOrderModelAPIView, ListAPIView):
    serializer_class = OrderModelSerializer


class RetrieveUpdateDestroyOrderModelAPIView(GeneralOrderModelAPIView, RetrieveUpdateDestroyAPIView):
    serializer_class = OrderModelSerializer


class SummaryView(APIView):
    def get(self, request):
        current_month = date.today().month
        current_year = date.today().year

        last_month = (date.today().replace(day=1) - timedelta(days=1)).month
        last_year = (date.today().replace(day=1) - timedelta(days=1)).year

        num_orders = OrderModel.objects.count() or 0

        num_customers = OrderModel.objects.values(
            'client').distinct().count() or 0

        total_sales_last_month = OrderDetailsModel.objects.filter(
            product_order__date_order__month=last_month,
            product_order__date_order__year=last_year
        ).aggregate(total_sales=Sum('amount'))['total_sales'] or 0

        total_sales_current_month = OrderDetailsModel.objects.filter(
            product_order__date_order__month=current_month,
            product_order__date_order__year=current_year
        ).aggregate(total_sales=Sum('amount'))['total_sales'] or 0

        income_last_month = OrderModel.objects.filter(
            date_order__month=last_month,
            date_order__year=last_year,
            paid=True
        ).aggregate(
            total_income=ExpressionWrapper(
                Sum(
                    F('orderdetailsmodel__amount') *
                    F('orderdetailsmodel__product__price'),
                    output_field=DecimalField()
                ),
                output_field=DecimalField()
            )
        )['total_income'] or 0

        income_current_month = OrderModel.objects.filter(
            date_order__month=current_month,
            date_order__year=current_year,
            paid=True
        ).aggregate(
            total_income=ExpressionWrapper(
                Sum(
                    F('orderdetailsmodel__amount') *
                    F('orderdetailsmodel__product__price'),
                    output_field=DecimalField()
                ),
                output_field=DecimalField()
            )
        )['total_income'] or 0

        city_more_orders = (
            OrderModel.objects.values('client__city')
            .annotate(order_count=Count('id'))
            .order_by('-order_count')
            .first()
        )

        if city_more_orders is None:
            city_more_orders = 0

        best_selling_product = (
            OrderModel.objects.values('products__name')
            .annotate(total_sales=Sum('orderdetailsmodel__amount'))
            .order_by('-total_sales')
            .first()
        )

        if best_selling_product is None:
            best_selling_product = 0

        data = {
            "num_orders": num_orders,
            "num_customers": num_customers,
            "total_sales_last_month": total_sales_last_month,
            "total_sales_current_month": total_sales_current_month,
            "income_last_month": income_last_month,
            "income_current_month": income_current_month,
            "city_more_orders": city_more_orders,
            "best_selling_product": best_selling_product,
        }

        serializer = SummarySerializer(data)
        return Response(serializer.data)

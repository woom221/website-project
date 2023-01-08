from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, UpdateAPIView, CreateAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from .serializers import SubscribedCustomerSerializer, CardDetailsSerializer, PaymentSerializer, UpdateSubscriptionSerializer, CancelSubscriptionSerializer, SubscriptionSerializer
from .models import SubscribedCustomer, Payments, Subscription
from django.http import Http404
import datetime


###### Card Views ######
# update card details - tested via postman
class ChangeCardView(UpdateAPIView):
    serializer_class = CardDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SubscribedCustomer, user=self.request.user)

###### Payment Views ######
# view payment history - tested via postman
class PaymentHistoryView(ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not SubscribedCustomer.objects.filter(user=self.request.user).exists():
            raise Http404("no past payments found")
        curr_cust = SubscribedCustomer.objects.get(user=self.request.user)
        return Payments.objects.filter(cust=curr_cust, payment_made=True)

# view upcoming payments - tested via postman
class FuturePaymentsView(ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not SubscribedCustomer.objects.filter(user=self.request.user).exists():
            raise Http404("no future payments found")
        curr_cust = SubscribedCustomer.objects.get(user=self.request.user)
        return Payments.objects.filter(cust=curr_cust, payment_made=False)

###### Subscription Views ######
# view all subscriptions
class SubscriptionsView(ListAPIView):
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.all()
    #permission_classes = [IsAuthenticated]

class MySubscriptionView(RetrieveAPIView):
    serializer_class = SubscribedCustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SubscribedCustomer, user=self.request.user)

# subscribe - tested via postman
class SubscribeView(CreateAPIView):
    serializer_class = SubscribedCustomerSerializer
    permission_classes = [IsAuthenticated]

# update subscription
class UpdateSubscriptionView(UpdateAPIView):
    serializer_class = UpdateSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SubscribedCustomer, user=self.request.user)

# cancel subscription
class CancelSubscriptionView(UpdateAPIView):
    serializer_class = CancelSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(SubscribedCustomer, user=self.request.user)

# method that will make payments due today
def make_due_payments():
    payments_due = Payments.objects.filter(due_date=datetime.date.today(), payment_made=False)
    for payment in payments_due:
        payment.payment_made = True
        payment.date_time = datetime.datetime.now()
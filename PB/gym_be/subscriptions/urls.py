from django.urls import path
from .views import CancelSubscriptionView, ChangeCardView, FuturePaymentsView, PaymentHistoryView, UpdateSubscriptionView, SubscribeView, SubscriptionsView, MySubscriptionView

app_name = 'subscriptions'

urlpatterns = [
    path("all_subscriptions/", SubscriptionsView.as_view()),
    path("my_subscription/", MySubscriptionView.as_view()),
    path("update-subscription/", UpdateSubscriptionView.as_view()),
    path("cancel-subscription/", CancelSubscriptionView.as_view()),
    path("subscribe/", SubscribeView.as_view()),
    path("update-card/", ChangeCardView.as_view()),
    path("payment-history/", PaymentHistoryView.as_view()),
    path("upcoming-payments/", FuturePaymentsView.as_view()),
]

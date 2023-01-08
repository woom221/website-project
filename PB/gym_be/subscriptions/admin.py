from django.contrib import admin
from subscriptions.models import Subscription, SubscribedCustomer, Payments


class SubscribedCustomerAdmin(admin.ModelAdmin):
    list_display = ('get_user_username', 'get_user_name', 'active')

    def get_user_username(self, obj):
        return obj.user.username
    get_user_username.short_description = 'Username'

    def get_user_name(self, obj):
        return obj.user.get_full_name()
    get_user_name.short_description = 'Full Name'


class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration')

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('cust', 'get_full_name', 'date_time', 'payment_made')

    def get_full_name(self, obj):
        return obj.cust.user.get_full_name()
    get_full_name.short_description = 'Full Name'


admin.site.register(Subscription, SubscriptionPlanAdmin)
admin.site.register(SubscribedCustomer, SubscribedCustomerAdmin)
admin.site.register(Payments, PaymentAdmin)

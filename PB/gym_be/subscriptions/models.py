from django.contrib.auth.models import User
from django.db import models

class Subscription(models.Model):
    name = models.CharField(max_length=20, default='Subscription Plan')
    CHOICES = [
        ('M', 'monthly'),
        ('Y', 'yearly')
    ]
    price = models.DecimalField(decimal_places=2, max_digits=10)
    duration = models.CharField(choices=CHOICES, default='Y', max_length=10)

    def __str__(self):
        return self.name

class SubscribedCustomer(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    subscription = models.ForeignKey(to=Subscription, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=6)
    card_num = models.CharField(max_length=16)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username

class Payments(models.Model):
    cust = models.ForeignKey(to=SubscribedCustomer, on_delete=models.CASCADE, related_name='customer', verbose_name='Customer')
    due_date = models.DateField()
    date_time = models.DateTimeField(null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    payment_made = models.BooleanField()

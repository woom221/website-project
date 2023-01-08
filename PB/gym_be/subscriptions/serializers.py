from rest_framework import serializers
from django.contrib.auth.models import User


from .models import Subscription, SubscribedCustomer, Payments

import datetime
from dateutil.relativedelta import relativedelta

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'name', 'price', 'duration']

class CardDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribedCustomer
        fields = ['payment_method', 'card_num']

class PaymentSerializer(serializers.ModelSerializer):
    card_num = serializers.CharField(source='cust.card_num')

    class Meta:
        model = Payments
        fields = ['card_num', 'date_time', 'due_date', 'amount']

class CancelSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribedCustomer
        fields = ['active',]

    def update(self, instance, validated_data):
        if 'active' in validated_data:
            status = validated_data['active']
            if status == False:
                # if subscription is canceled, set active to False instead of deleting record - important for referential integrity
                instance.active = status
                instance.save()
                Payments.objects.filter(cust=instance, payment_made=False).delete()
                # delete upcoming classes the user is enrolled in
                user = instance.user
                for c in user.class_set.all():
                    user.class_set.remove(c)
        return instance

class UpdateSubscriptionSerializer(serializers.ModelSerializer):
    subs_id = serializers.IntegerField(source='subscription.id')
    class Meta:
        model = SubscribedCustomer
        fields = ['subs_id',]

    def validate(self, data: dict) -> dict:
        print(data)
        if 'subscription' in data:
            if not Subscription.objects.filter(id=data['subscription']['id']).exists():
                raise serializers.ValidationError({'error': 'Subscription does not exist.'})
            data['subscription'] = Subscription.objects.get(id=data['subscription']['id'])
        return data

    def update(self, instance, validated_data):
        print(validated_data)
        if 'subscription' in validated_data:
            instance.subscription = validated_data['subscription']
            instance.save()
            # change upcoming payments
            Payments.objects.filter(cust=instance, payment_made=False).delete()
            if (instance.subscription.duration == 'Y'):
                for i in range(1, 5):
                    next_p = Payments(cust=instance, due_date=datetime.date.today().replace(year = datetime.date.today().year + i), amount=validated_data['subscription'].price, payment_made=False)
                    next_p.save()
            else:
                for i in range(1, 12):
                    next_p = Payments(cust=instance, due_date=datetime.date.today() + relativedelta(months=+i), amount=validated_data['subscription'].price, payment_made=False)
                    next_p.save()
        return instance

class SubscribedCustomerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    subs_id = serializers.IntegerField(source='subscription.id')
    subs_name = serializers.CharField(source='subscription.name')
    subs_price = serializers.DecimalField(source='subscription.price', decimal_places=2, max_digits=10)
    subs_duration = serializers.CharField(source='subscription.duration')

    class Meta:
        model = SubscribedCustomer
        fields = ['username', 'subs_id', 'payment_method', 'card_num', 'active', 'subs_price', 'subs_duration', 'subs_name']

    def create(self, validated_data):
        print(validated_data)
        temp = validated_data['user']
        if SubscribedCustomer.objects.filter(user=temp).exists():
            cust = SubscribedCustomer.objects.get(user=temp)
            if cust.active == False:
                cust.subscription = validated_data['subscription']
                cust.payment_method = validated_data['payment_method']
                cust.card_num = validated_data['card_num']
                cust.active = True
                cust.save()
                instance = cust
            else:
                raise serializers.ValidationError({'error': 'Already subscribed!'})
        else:
            instance = SubscribedCustomer(subscription=validated_data['subscription'], active=validated_data['active'], payment_method=validated_data['payment_method'], card_num = validated_data['card_num'], user=validated_data['user'])
            instance.save()
            #instance = super().create(validated_data)

        # add first payment
        first_p = Payments(cust=instance, due_date=datetime.date.today(), date_time = datetime.datetime.now(), amount=validated_data['subscription'].price, payment_made=True)
        first_p.save()

        # add future payments
        duration = validated_data['subscription'].duration
        if (duration == 'Y'):
            print('yes')
            for i in range(1, 5):
                next_p = Payments(cust=instance, due_date=datetime.date.today().replace(year = datetime.date.today().year + i), amount=validated_data['subscription'].price, payment_made=False)
                next_p.save()
        else:
            for i in range(1, 12):
                next_p = Payments(cust=instance, due_date=datetime.date.today() + relativedelta(months=+i), amount=validated_data['subscription'].price, payment_made=False)
                next_p.save()

        return instance

    def validate(self, data: dict) -> dict:
        print(data)
        data['user'] = User.objects.get(username=data['user']['username'])
        if not Subscription.objects.filter(id=data['subscription']['id']).exists():
            raise serializers.ValidationError({'error': 'Subscription does not exist.'})
        data['subscription'] = Subscription.objects.get(id=data['subscription']['id'])
        return data

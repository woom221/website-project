from django.contrib.auth.models import User
from django.db.models import Q
from django.utils.datetime_safe import datetime
from rest_framework.generics import ListAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.timezone import make_aware

from .models import Class
from .serializers import ClassSerializer
from studios.models import Studio

from subscriptions.models import SubscribedCustomer


class SpecificStudioView(ListAPIView):
    serializer_class = ClassSerializer

    def get(self, request, *args, **kwargs):
        if self.kwargs['studio_id'] not in Studio.objects.all().values_list('id', flat=True):
            return Response(data= {
                'details': 'Page Not Found'
            }, status=404)
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        studio = Studio.objects.get(id=self.kwargs['studio_id'])
        queryset = Class.objects.filter(studio=studio).filter(Q(time__gte=make_aware(datetime.now())))
        return queryset.order_by('time')


class SubscriptionPermission(BasePermission):
    message = "You need to subscribe first"

    def has_permission(self, request, view):
        if request.user.id not in SubscribedCustomer.objects.all().values_list('user', flat=True) \
                or SubscribedCustomer.objects.get(user=request.user.id).active == False:
            return False
        else:
            return True


class EnrolUserView(APIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated, SubscriptionPermission]

    def get(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data= {'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        if class_obj.capacity == 0:
            return Response({'details': 'class is full'})
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'class has already started'})
        if request.user in class_obj.enrolled.all():
            return Response({'details': 'You are already enrolled in this class'})
        return Response({'details':'Send POST request to enroll this course'})

    def post(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data= {'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        if class_obj.capacity == 0:
            return Response({'details': 'class is full'})
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'class has already started'})
        if request.user in class_obj.enrolled.all():
            return Response({'details': 'You are already enrolled in this class'})
        class_obj.capacity -= 1
        class_obj.enrolled.add(request.user)
        class_obj.save()
        return Response({'details': f'Successfully enrolled to {class_obj.name}!'})


class EnrolUserAllRecursionView(APIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated, SubscriptionPermission]

    def get(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data={'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        class_obj_group = Class.objects.filter(group_id=class_obj.group_id)
        for classes in class_obj_group:
            if classes.capacity == 0:
                return Response({'details': 'at least one of the recurring class is full, but you can still register for the rest'})
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'class has already started, but you can register for the future classes'})
        if request.user in class_obj.enrolled.all():
            return Response({'details': 'You are already enrolled in this class, but you can try to enrol for the future classes'})
        return Response({'details':'Send POST request to enroll this course and its subsequent course'})

    def post(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data= {'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        class_obj_group = Class.objects.filter(group_id=class_obj.group_id)
        enrolled = []
        for classes in class_obj_group:
            if classes.capacity != 0 and classes.time >= class_obj.time and request.user not in classes.enrolled.all():
                enrolled.append(classes)
                classes.enrolled.add(request.user)
                classes.capacity -= 1
                classes.save()
        if len(enrolled) != 0:
            return Response({'details': f'Successfully enrolled to {len(enrolled)} subsequent classes of {enrolled[0].name}!'})
        else:
            return Response({'details': f'every class is full or there is no class offered or you are already enrolled in every class'})


class DropUserView(APIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data={
                'details': 'Page Not Found'
            }, status=404)
        class_obj = Class.objects.get(id=class_id)
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'Class has already started'})
        if request.user not in class_obj.enrolled.all():
            return Response({'details': 'You are not enrolled in this class'})
        return Response({'details':'Send POST request to drop from the course'})

    def post(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data={
                'details': 'Page Not Found'
            }, status=404)
        class_obj = Class.objects.get(id=class_id)
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'class has already started'})
        if request.user in class_obj.enrolled.all():
            class_obj.capacity += 1
            class_obj.enrolled.remove(request.user)
            class_obj.save()
            return Response({'details': f'Successfully dropped from {class_obj.name}!'})
        else:
            return Response({'details': 'You are not enrolled in this class'})


class DropAllUserView(APIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data= {'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        if class_obj.time < make_aware(datetime.now()):
            return Response({'details': 'class has already started, but you can drop the subsequent future classes if you are enrolled'})
        if request.user not in class_obj.enrolled.all():
            return Response({'details': 'You are not enrolled in this class, but you may be enrolled in its subsequent classes'})
        return Response({'details':'Send POST request to drop from the course and its subsequent courses'})

    def post(self, request, class_id):
        if class_id not in Class.objects.all().values_list('id', flat=True):
            return Response(data= {'details': 'Page Not Found'}, status=404)
        class_obj = Class.objects.get(id=class_id)
        class_obj_group = Class.objects.filter(group_id=class_obj.group_id)
        dropped = []
        for classes in class_obj_group:
            if classes.time >= class_obj.time and request.user in classes.enrolled.all():
                dropped.append(classes)
                classes.capacity += 1
                classes.enrolled.remove(request.user)
                classes.save()
        if len(dropped) != 0:
            return Response({'details': f'Successfully dropped from {len(dropped)} classes!'})
        else:
            return Response({'details': 'You are not enrolled in any of the indicated classes or there is no subsequent classes to drop from'})


class SpecificUserView(ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if self.kwargs['user_id'] != request.user.id:
            return Response(data= {
                'details': 'Forbidden'
            }, status=403)
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs['user_id'])
        queryset = Class.objects.filter(enrolled=user)
        return queryset.order_by('time')


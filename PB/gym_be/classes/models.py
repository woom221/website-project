import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import make_aware
from django.db.models import CASCADE
from django.utils import timezone
from django.utils.datetime_safe import datetime
import datetime as dt


from studios.models import Studio


class KeyWord(models.Model):
    keyword = models.CharField(max_length=20)

    def __str__(self):
        return self.keyword


class Class(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=255)
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE,
                               related_name='classes')
    keywords = models.ManyToManyField(KeyWord)
    coach = models.ForeignKey(to=User, null=True, blank=True, on_delete=CASCADE, related_name='coach')
    capacity = models.PositiveIntegerField(default=5)
    enrolled = models.ManyToManyField(User, blank=True)
    time = models.DateTimeField(default=datetime.now, verbose_name='Start Time')
    end_recursion = models.DateField(default=timezone.now, verbose_name='End Date')
    group_id = models.UUIDField(default=uuid.uuid4, editable=False)

    def create_recursion(self, time, end_recursion):
        date_given = time.date()
        date_given = date_given + dt.timedelta(days=7)
        time_given = time.time()
        query_group = Class.objects.filter(group_id=self.group_id)
        over_end_time = []
        if len(query_group) != 0:
            latest_class = query_group[0]
            for queries in query_group:
                queries.end_recursion = self.end_recursion
                queries.save()
                if queries.time > latest_class.time:
                    latest_class = queries
                if queries.time.date() > self.end_recursion:
                    if queries.id != self.id:
                        over_end_time.append(queries)
            date_given = latest_class.time.date() + dt.timedelta(days=7)
        if date_given <= end_recursion:
            while date_given <= end_recursion:
                new_datetime = dt.datetime.combine(date_given, time_given)
                new_class = Class.objects.create(name=self.name, description=self.description, studio=self.studio, coach=self.coach, capacity=self.capacity, time=make_aware(new_datetime),
                  end_recursion=self.end_recursion, group_id=self.group_id)
                new_class.enrolled.set(self.enrolled.all())
                new_class.keywords.set(self.keywords.all())
                new_class.save()
                date_given = date_given + dt.timedelta(days=7)
        else:
            for items in over_end_time:
                items.delete()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['time']

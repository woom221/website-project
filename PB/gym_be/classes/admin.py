from django.contrib import admin
from django.contrib.admin.helpers import ActionForm
from django.db.models import Q
from django import forms

from .models import Class, KeyWord

@admin.action(description='Delete the selected classes and '
                          'all of their subsequent classes')
def delete_all(modeladmin, request, queryset):
    group_ids = queryset.values_list('group_id', flat=True)
    times = queryset.values_list('time', flat=True)
    new_group_id = []
    new_time = []
    for j in range(len(group_ids)):
        if group_ids[j] not in new_group_id:
            new_group_id.append(group_ids[j])
            new_time.append(times[j])
    for i in range(len(new_group_id)):
        selected = Class.objects.all().filter(group_id=new_group_id[i])
        selected.filter(Q(time__gte=new_time[i])).delete()


class TimeChangeForm(ActionForm):
    datetime_field = forms.DateTimeField(widget=forms.TextInput(attrs={'class': 'form-control', 'type':'datetime-local'}), required=False)
    time_field = forms.TimeField(widget=forms.TextInput(attrs={'class': 'form-control', 'type':'time'}), required=False)


@admin.action(description='Change start date and time of the selected classes')
def modify_selection(modeladmin, request, queryset):
    if request.POST['datetime_field'] != '':
        for chosen in queryset:
            chosen.time = request.POST['datetime_field']
            chosen.save()


@admin.action(description='Change start time of the selected classes')
def modify_time_selection(modeladmin, request, queryset):
    if request.POST['time_field'] != '':
        for chosen in queryset:
            time_lst = request.POST['time_field'].split(':')
            hour = time_lst[0]
            minute = time_lst[1]
            chosen.time = chosen.time.replace(hour=int(hour), minute=int(minute))
            chosen.save()


class ClassAdmin(admin.ModelAdmin):
    action_form = TimeChangeForm
    actions = [delete_all, modify_selection, modify_time_selection]
    list_display = ('id', 'name', 'get_coach', 'time', 'end_recursion')

    def get_coach(self, obj):
        if obj.coach.first_name != '' and obj.coach.last_name != '':
            return obj.coach.get_full_name()
        else:
            return obj.coach
    get_coach.short_description = 'Coach'

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        form.save()
        obj.create_recursion(obj.time, obj.end_recursion)


admin.site.register(KeyWord)
admin.site.register(Class, ClassAdmin)


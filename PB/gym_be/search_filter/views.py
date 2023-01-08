from rest_framework.generics import ListAPIView
from classes.models import Class
from classes.serializers import ClassSerializer
from studios.models import Studio, Amenities
from studios.serializers import StudioSerializer


class ClassListViewName(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        class_name = self.kwargs['class']
        return Class.objects.filter(name=class_name)

class ClassListViewCoach(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        coach_name = self.kwargs['coach']
        return Class.objects.filter(coach__username=coach_name)

class ClassListViewYear(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        year = self.kwargs['year']
        return Class.objects.filter(time__year=year)

class ClassListViewMonth(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        month = self.kwargs['month']
        return Class.objects.filter(time__month=month)

class ClassListViewDay(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        day = self.kwargs['day']
        return Class.objects.filter(time__day=day)


class ClassListViewHour(ListAPIView):
    serializer_class = ClassSerializer

    def get_queryset(self):
        hour = self.kwargs['hour']
        return Class.objects.filter(time__hour=hour)


class FilteredStudioViewName(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        studio = self.kwargs['studio']
        return Studio.objects.filter(name=studio)


class FilteredStudioViewCoach(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        coach_name = self.kwargs['coach']
        class_coach = Class.objects.filter(coach__username=coach_name)
        studio = []
        for c in class_coach:
            if c.studio not in studio:
                studio.append(c.studio)
        return studio

class FilteredStudioViewAmenities(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        amenities = self.kwargs['amenities']
        amen_filtered = Amenities.objects.filter(name=amenities)
        studio = []
        for a in amen_filtered:
            if a.studio not in studio:
                studio.append(a.studio)
        return studio

class FilteredStudioViewClass(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        class_name = self.kwargs['class']
        class_filtered = Class.objects.filter(name=class_name)
        studio = []
        for c in class_filtered:
            if c.studio not in studio:
                studio.append(c.studio)
        return studio

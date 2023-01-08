from django.urls import path, re_path
from .views import ClassListViewName, ClassListViewCoach, ClassListViewDay, ClassListViewHour, \
    ClassListViewMonth, ClassListViewYear, \
    FilteredStudioViewAmenities, FilteredStudioViewClass, \
    FilteredStudioViewName, FilteredStudioViewCoach

app_name = 'search_filter'


urlpatterns = [
    re_path('^class-filter-name/(?P<class>.+)/$', ClassListViewName.as_view()),
    re_path('^class-filter-coach/(?P<coach>.+)/$', ClassListViewCoach.as_view()),
    re_path('^class-filter-day/(?P<day>.+)/$', ClassListViewDay.as_view()),
    re_path('^class-filter-hour/(?P<hour>.+)/$', ClassListViewHour.as_view()),
    re_path('^class-filter-month/(?P<month>.+)/$', ClassListViewMonth.as_view()),
    re_path('^class-filter-year/(?P<year>.+)/$', ClassListViewYear.as_view()),
    path('studio-filter-coach/<str:coach>/', FilteredStudioViewCoach.as_view()),
    re_path('^studio-filter-name/(?P<studio>.+)/$', FilteredStudioViewName.as_view()),
    re_path('^studio-filter-class/(?P<class>.+)/$', FilteredStudioViewClass.as_view()),
    re_path('^studio-filter-amenities/(?P<amenities>.+)/$', FilteredStudioViewAmenities.as_view()),
]

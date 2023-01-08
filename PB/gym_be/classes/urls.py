from django.urls import path

from .views import DropAllUserView, DropUserView, EnrolUserAllRecursionView, \
    EnrolUserView, \
    SpecificStudioView, \
    SpecificUserView

app_name = 'classes'

urlpatterns = [
    path('studio/<int:studio_id>/', SpecificStudioView.as_view()),
    path('add/<int:class_id>/', EnrolUserView.as_view()),
    path('drop/<int:class_id>/', DropUserView.as_view()),
    path('view/<int:user_id>/', SpecificUserView.as_view()),
    path('addall/<int:class_id>/', EnrolUserAllRecursionView.as_view()),
    path('dropall/<int:class_id>/', DropAllUserView.as_view()),
]

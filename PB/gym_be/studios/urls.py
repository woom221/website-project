from django.urls import path
from .views import AllStudiosView, StudioView

app_name = 'studios'

urlpatterns = [
    path('all-studios/', AllStudiosView.as_view()),
    path('studio/<int:id>', StudioView.as_view()),
    
]
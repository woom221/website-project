from django.urls import path
from .views import RegisterView, LoginView, EditProfileView

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('edit-profile/', EditProfileView.as_view()),
]
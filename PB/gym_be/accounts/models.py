from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to= 'avatars', null=True, blank=True)
    phone_num = models.CharField(max_length=12, null=True, blank=True)

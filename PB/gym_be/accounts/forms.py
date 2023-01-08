from django import forms
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
import re

class RegisterForm(UserCreationForm):
    first_name = forms.CharField(label=_("First name"), max_length=150, required=False)
    last_name = forms.CharField(label=_("Last name"), max_length=150, required=False)
    email = forms.EmailField(required=False)
    phone_num = forms.CharField(label=_("Phone number"), required=False)
    avatar = forms.FileField(label=_("Avatar"), required=False)

    def clean(self):
        cleaned_data = super().clean()
        ph_num_pattern = "[0-9]{3}[-][0-9]{3}[-][0-9]{4}"
        if 'phone_num' in cleaned_data and not re.match(ph_num_pattern, cleaned_data['phone_num']):
            self.add_error('phone_num', 'Invalid phone number')
        print(self.errors)

    def save(self, commit=True):        
        user = super().save(commit=False)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.email = self.cleaned_data["email"]
        
        #user.phone_num = self.cleaned_data["phone_num"]
        #user.avatar = self.cleaned_data["avatar"]
        if commit:
            user.save()
            p1 = Profile.objects.create(user=user, avatar=self.cleaned_data["avatar"], phone_num=self.cleaned_data["phone_num"])
            p1.save()
        return user
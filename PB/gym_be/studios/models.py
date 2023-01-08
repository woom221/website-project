from django.db import models
from django.core.validators import RegexValidator
from django.db.models import CASCADE
from geopy.geocoders import Nominatim


phone_validator = RegexValidator(regex=r'^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$', message='Invalid phone number')
pc_validator = RegexValidator(regex=r'^[A-Z][0-9][A-Z][ ][0-9][A-Z][0-9]$', message='Invalid postal code')

class Studio(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    longitude = models.DecimalField(max_digits=11, decimal_places=7, null=True, blank=True)
    latitude = models.DecimalField(max_digits=11, decimal_places=7, null=True, blank=True)
    postal_code = models.CharField(max_length=9, validators=[pc_validator])
    phone_num = models.CharField(max_length=12, validators=[phone_validator])
    distance = models.FloatField(blank=True, null=True)

    def save(self, *args, **kwargs):
        geolocator = Nominatim(user_agent="studios")
        geo_add = geolocator.geocode(self.address)
        if geo_add:
            if not self.longitude:
                self.longitude = geo_add.longitude
            if not self.latitude:
                self.latitude = geo_add.latitude
        super().save(args, kwargs)

    def __str__(self):
        return self.name

class Amenities(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField()
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE, related_name='amenities')

class Images(models.Model):
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE, related_name='images')
    image = models.ImageField(upload_to='studios')

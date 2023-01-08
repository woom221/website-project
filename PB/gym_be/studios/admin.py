from django.contrib import admin
from .models import Studio, Amenities, Images

class ImageInline(admin.TabularInline):
    model = Images

class WebsiteAdmin(admin.ModelAdmin):\
    list_display = ['id', 'name', 'address', 'latitude', 'longitude', 'postal_code', 'phone_num']


admin.site.register(Studio, WebsiteAdmin)
admin.site.register(Amenities)
admin.site.register(Images)

from rest_framework.generics import RetrieveAPIView, ListAPIView
from geopy.distance import geodesic
from django.shortcuts import get_object_or_404
from .serializers import StudioSerializer
from .models import Studio

from geopy.geocoders import Nominatim

# Create your views here.
class AllStudiosView(ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        geolocator = Nominatim(user_agent="studios")
        #if origin hasn't been passed to the BE, we return the list of studios ordered by id
        if 'origin' in self.request.GET:
            origin = self.request.GET['origin']
            type = self.request.GET['type']
            if type == 'place':
                origin = geolocator.geocode(origin)
            elif type == 'pc':
                # convert postal code to lat-lon
                origin = geolocator.geocode(query={'postalcode': origin})
            elif type == 'currloc':
                spl = origin.split(',')
                origin = spl
            if origin:
                if type == 'latlon':
                    print(origin[1])
                    tup_origin = (origin[1], origin[0])
                elif type == 'currloc':
                    tup_origin = (origin[1], origin[0])
                else:
                    tup_origin = (origin.latitude, origin.longitude)
                print(tup_origin)
                for studio in Studio.objects.all():
                    studio.distance = geodesic(tup_origin, (studio.latitude, studio.longitude)).miles
                    studio.save()
                    print((studio.latitude, studio.longitude))

                ordered_studios = Studio.objects.order_by('distance')
                return ordered_studios 

        return Studio.objects.all()

class StudioView(RetrieveAPIView):
    serializer_class = StudioSerializer

    def get_object(self):
        print(self.kwargs)
        return get_object_or_404(Studio, id=self.kwargs['id'])



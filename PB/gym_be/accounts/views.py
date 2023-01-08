from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout, authenticate
from .serializers import RegisterSerializer, ProfileSerializer
from .models import Profile
import json
# Create your views here.

# Register View - tested via Postman
class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer

# Log In View - tested via Postman
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        if 'username' not in body or 'password' not in body or len(body['username']) == 0 or len(body['password']) == 0:
            return Response({
                'details': 'Please enter credentials',
                'status': 401
            }, status=401)
        un = body['username']
        pw = body['password']
        user = authenticate(username=un, password=pw)
        if not user:
            return Response({
                'details': 'Invalid credentials',
                'status': 401
            }, status=401)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'status':200}, status=200)

# Log out View - do not need = confirm
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        Token.objects.get(user=self.request.user).delete()
        logout(request)

# Edit Profile view - tested via Postman
class EditProfileView(RetrieveAPIView, UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        print(self.request.user)
        print(Profile.objects.all())
        return get_object_or_404(Profile, user=self.request.user)

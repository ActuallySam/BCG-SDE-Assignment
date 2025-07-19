import secrets
# Models
from .models import Product, User
# Django Core
from django.urls import reverse
from django.core.cache import caches
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
#DRF
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView
# Serializer
from .serializers import ProductSerializer, RegisterSerializer
# Permissions
from .permissions import IsAdmin, IsBuyer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = default_token_generator.make_token(user)
            verification_link = request.build_absolute_uri(
                reverse('verify-email', args=[user.pk, token])
            )
            send_mail(
                'Verify Your Email',
                f'Click the link to verify your email: {verification_link}',
                'noreply@example.com',
                [user.email],
                fail_silently=False,
            )
            return Response({'status': True, 'message': 'User registered. Please verify your email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    def get(self, request, user_id, token):
        try:
            user = User.objects.get(pk=user_id)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({'message': 'Email verified successfully!'}, status=200)
            return Response({'message': 'Invalid token.'}, status=400)
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=404)


class LoginView(APIView):
    def post(self, request):
        data = request.data.copy()
        try:
            user = User.objects.get(username=data['username'])
        except User.DoesNotExist:
            return Response({"message": 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        if not user.check_password(data['password']):
            raise Response({"message": 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        if user and user.is_active:
            connection = caches["default"]
            token = secrets.token_hex(20)
            connection.set(token, user.__dict__, 60 * 30)
            response = Response({'token': token, 'username': user.username, 'role': user.role})
            response.set_cookie(
                key='auth_token',  # Cookie name
                value=token,       # Token value
                httponly=True,     # Prevent client-side JavaScript access
                secure=True,       # Only send over HTTPS (in production)
                samesite='Strict', # Prevent CSRF attacks
                max_age=60 * 30  # Cookie expiration time (24 hours)
            )
            return response
        return Response({"message": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class GetAllProductsView(ListAPIView):

    http_allowed_methods = ['post']
    # permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        category_filter = request.data.get("category", "")
        search_filter = request.data.get("search", "")
        filters = {
            "category": category_filter,
            "name__icontains": search_filter,
        }
        products = Product.objects.all()
        distinct_categories = list(products.values_list("category", flat=True).distinct())
        categorized_products = products.filter(**filters)
        serializer = ProductSerializer(categorized_products, many=True)
        return Response({
            "status": True,
            "products": serializer.data,
            "distinct_categories": distinct_categories
        }, status=status.HTTP_200_OK)


class ProductView(GenericAPIView):
    http_allowed_methods = ['post', 'put', 'delete']

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"status": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        product_id = request.data.get("product_id", None)
        try:
            product_object = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"status": False, "error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product_object, data=request.data, partial=True)  # `partial=True` allows partial updates

        if serializer.is_valid():
            # Save the updated data
            serializer.save()
            return Response({ "status": True, "message": "Product updated successfully"}, status=status.HTTP_200_OK)

        # If the data is not valid, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        product_id = request.data.get("product_id", None)
        try:
            product_object = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"status": False, "error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        product_object.delete()
        return Response({"status": True, "message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
from rest_framework import serializers
from .models import Product, User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data["role"]
        )
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'category',
            'cost_price',
            'selling_price',
            'stock_available',
            'units_sold',
            'optimized_price',
            'demand_forecast'
        ]
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('buyer', 'Buyer'),
        ('supplier', 'Supplier'),
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='buyer')
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='products_user_set',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='products_user_set',
        related_query_name='user',
    )

    def __str__(self):
        return self.username

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_available = models.IntegerField()
    units_sold = models.IntegerField()
    customer_rating = models.IntegerField(null=True)
    demand_forecast = models.IntegerField(null=True)
    optimized_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        managed = False
        db_table = 'product'
        
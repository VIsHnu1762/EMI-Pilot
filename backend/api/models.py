from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class EMI(models.Model):
    """EMI Model matching the MongoDB schema"""
    name = models.CharField(max_length=200)
    monthly_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    due_date = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(31)]
    )
    loan_type = models.CharField(max_length=100, blank=True, null=True)
    tenure = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_date']
        db_table = 'emis'

    def __str__(self):
        return f"{self.name} - ₹{self.monthly_amount}"


class User(models.Model):
    """User Model for storing monthly income"""
    monthly_income = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"Income: ₹{self.monthly_income}"

from django.contrib import admin
from .models import EMI, User


@admin.register(EMI)
class EMIAdmin(admin.ModelAdmin):
    list_display = ['name', 'monthly_amount', 'due_date', 'loan_type', 'tenure', 'created_at']
    list_filter = ['loan_type', 'due_date']
    search_fields = ['name', 'loan_type']
    ordering = ['due_date']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['monthly_income', 'updated_at']

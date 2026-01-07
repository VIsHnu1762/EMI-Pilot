from django.urls import path
from . import views

urlpatterns = [
    # Health check
    path('health', views.health_check, name='health'),
    
    # EMI endpoints
    path('emis', views.emi_list, name='emi-list'),
    path('emis/<int:pk>', views.emi_detail, name='emi-detail'),
    path('emis/summary/all', views.emi_summary, name='emi-summary'),
    
    # User/Income endpoints
    path('user/income', views.user_income, name='user-income'),
]

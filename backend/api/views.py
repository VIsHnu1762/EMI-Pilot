from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import EMI, User
from .serializers import EMISerializer, UserSerializer


# Health Check
@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'ok',
        'message': 'EMI-Pilot Django API is running'
    })


# EMI Views
@api_view(['GET', 'POST'])
def emi_list(request):
    """Get all EMIs or create a new EMI"""
    if request.method == 'GET':
        emis = EMI.objects.all()
        serializer = EMISerializer(emis, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = EMISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def emi_detail(request, pk):
    """Get, update or delete a specific EMI"""
    try:
        emi = EMI.objects.get(pk=pk)
    except EMI.DoesNotExist:
        return Response(
            {'message': 'EMI not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        serializer = EMISerializer(emi)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = EMISerializer(emi, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        emi_data = EMISerializer(emi).data
        emi.delete()
        return Response({
            'message': 'EMI deleted successfully',
            'emi': emi_data
        })


@api_view(['GET'])
def emi_summary(request):
    """Get EMI summary with total and count"""
    emis = EMI.objects.all()
    serializer = EMISerializer(emis, many=True)
    
    total_emi = sum(float(emi.monthly_amount) for emi in emis)
    count = emis.count()
    
    return Response({
        'totalEMI': total_emi,
        'count': count,
        'emis': serializer.data
    })


# User/Income Views
@api_view(['GET', 'POST'])
def user_income(request):
    """Get or update user income"""
    if request.method == 'GET':
        # Get or create user (single user app)
        user, created = User.objects.get_or_create(
            id=1,
            defaults={'monthly_income': 0}
        )
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Update or create user income
        try:
            user = User.objects.get(id=1)
            serializer = UserSerializer(user, data=request.data, partial=True)
        except User.DoesNotExist:
            serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import serializers
from .models import EMI, User


class EMISerializer(serializers.ModelSerializer):
    """Serializer for EMI model - matches MongoDB format"""
    _id = serializers.SerializerMethodField()
    monthlyAmount = serializers.DecimalField(
        source='monthly_amount',
        max_digits=10,
        decimal_places=2
    )
    dueDate = serializers.IntegerField(source='due_date')
    loanType = serializers.CharField(source='loan_type', required=False, allow_blank=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = EMI
        fields = ['_id', 'name', 'monthlyAmount', 'dueDate', 'loanType', 'tenure', 'createdAt']

    def get__id(self, obj):
        return str(obj.id)

    def create(self, validated_data):
        return EMI.objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    _id = serializers.SerializerMethodField()
    monthlyIncome = serializers.DecimalField(
        source='monthly_income',
        max_digits=10,
        decimal_places=2
    )
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'monthlyIncome', 'updatedAt']

    def get__id(self, obj):
        return str(obj.id)

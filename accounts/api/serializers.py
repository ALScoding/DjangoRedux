from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core import exceptions
from rest_framework import serializers
import django.contrib.auth.password_validation as validators 

# User._meta.get_field('email')._unique = True


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

    def validate(self, data):
         # here data has all the fields which have validated values
         # so we can create a User instance out of it
         user = User(**data)
         # get the password from the data
         password = data.get('password')
         errors = dict() 
         try:
             # validate the password and catch the exception
             validators.validate_password(password=password, user=User)
         # the exception raised here is different than serializers.ValidationError
         except exceptions.ValidationError as e:
             errors['password'] = list(e.messages)
         if errors:
             raise serializers.ValidationError(errors)
         return super(RegisterSerializer, self).validate(data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

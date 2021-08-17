from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class NotesSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = models.Note
        fields = ['id', 'title', 'content', 'owner']

    def validate_title(self, value):
        if value == 'foobar':
            raise serializers.ValidationError("Can't be equal to 'foobar'")

        return value


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user: User = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance: User, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))

        return super(UserSerializer, self).update(instance, validated_data)

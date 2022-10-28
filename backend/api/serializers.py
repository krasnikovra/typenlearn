from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import *
from authentication.models import User


class GameModeSeializer(serializers.ModelSerializer):
    class Meta:
        model = GameMode
        fields = ('__all__')


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('id', 'text')


class RecordSerializer(serializers.ModelSerializer):
    gamemode = GameModeSeializer(read_only=True)
    text = TextSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    gamemode_id = serializers.IntegerField(write_only=True)
    text_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Record
        fields = ['id', 'user', 'gamemode', 'gamemode_id', 'text', 'text_id', 'timems']
        read_only_fields = ['id']

    def validate(self, data):
        try:
            user = self.context.get('user', None)
            if user is None or not user.is_authenticated:
                raise serializers.ValidationError(
                    'Unknown user or unauthorized')

            gamemode_id = data.get('gamemode_id', None)
            if gamemode_id is None:
                raise serializers.ValidationError(
                    'You have not provided gamemode id')
            gamemode = GameMode.objects.get(pk=gamemode_id)

            text_id = data.get('text_id', None)
            if text_id is None:
                raise serializers.ValidationError(
                    'You have not provided text id')
            text = Text.objects.get(pk=text_id)

            timems = data.get('timems', None)
            if timems is None:
                raise serializers.ValidationError(
                    'You have not provided timems')
            if type(timems) is not int:
                raise serializers.ValidationError(
                    'You have provided non-integer in timems')

            return {
                'user': user,
                'gamemode': gamemode,
                'text': text,
                'timems': timems,
            }
        except GameMode.DoesNotExist:
            raise serializers.ValidationError('GameMode not found')
        except Text.DoesNotExist:
            raise serializers.ValidationError('Text not found')

    def create(self, validated_data):
        try:
            record = Record.objects.get(user=validated_data['user'],
                                        gamemode=validated_data['gamemode'], 
                                        text=validated_data['text'])
            if validated_data['timems'] < record.timems:
                record.timems = validated_data['timems']
                record.save()
            return record
        except Record.DoesNotExist:
            return Record.objects.create(**validated_data)

from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from .serializers import *
from .renderers import *

class GenericAPIView(APIView):
    def serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_context()
        return self.serializer_class(*args, **kwargs)

    def get_context(self):
        return {
            'user': self.request.user
        }


class RecordView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecordSerializer
    renderer_classes = (RecordJSONRenderer,)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({
                'authorized': False
            }, status=status.HTTP_200_OK)

        data = request.data.get('record', {})

        serializer = self.serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
                'authorized': True,
                'record': serializer.data
            }, status=status.HTTP_200_OK)


class GameModeView(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    serializer_class = GameModeSeializer
    renderer_classes = (GameModeJSONRenderer,)

    def get_all(self, request):
        gamemodes = GameMode.objects.all()
        serializer = self.serializer_class(gamemodes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_specific(self, request, pk=None):
        try:
            gamemode = GameMode.objects.get(pk=pk)
            serializer = self.serializer_class(gamemode)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GameMode.DoesNotExist:
            raise Http404("GameMode not found")

class TextView(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    serializer_class = TextSerializer
    renderer_classes = (TextJSONRenderer,)

    def get_all(self, request, gamemode_pk=None):
        try:
            gamemode = GameMode.objects.get(pk=gamemode_pk)
            texts = Text.objects.filter(gamemode=gamemode)
            serializer = self.serializer_class(texts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GameMode.DoesNotExist:
            raise Http404("GameMode not found")

    def get_specific(self, request, gamemode_pk=None, pk=None):
        try:
            gamemode = GameMode.objects.get(pk=gamemode_pk)
            text = Text.objects.get(pk=pk)
            if text.gamemode != gamemode:
                raise Text.DoesNotExist()
            serializer = self.serializer_class(text)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GameMode.DoesNotExist:
            raise Http404("GameMode not found")
        except Text.DoesNotExist:
            raise Http404("Text not found")


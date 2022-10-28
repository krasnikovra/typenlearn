from django.urls import path

from .views import *

urlpatterns = [
    path('record/', RecordView.as_view()),
    path('gamemode/', GameModeView.as_view({'get': 'get_all'})),
    path('gamemode/<int:pk>/', GameModeView.as_view({'get': 'get_specific'})),
    path('gamemode/<int:gamemode_pk>/text/', TextView.as_view({'get': 'get_all'})),
    path('gamemode/<int:gamemode_pk>/text/<int:pk>/', TextView.as_view({'get': 'get_specific'})),
]

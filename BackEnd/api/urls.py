from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('sendGuess/', views.addGuess),
    path('claimWin/', views.claimWin)
]

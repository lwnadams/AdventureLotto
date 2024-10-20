from rest_framework import serializers
from base.models import Guess
from base.models import claimWin

class guessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guess
        fields = '__all__'


class claimWinSerializer(serializers.ModelSerializer):
    class Meta:
        model = claimWin
        fields = '__all__'
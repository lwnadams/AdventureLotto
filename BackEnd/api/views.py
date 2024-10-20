from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Guess
from base.models import djangoNumber
from .serializers import guessSerializer
from .serializers import claimWinSerializer


@api_view(['GET'])
def getData(request):
    items = Guess.objects.all()
    serializer = guessSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addGuess(request):
    response = djangoNumber(request.data)
    serializer = guessSerializer(data=response)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response("Data invalid")
    
@api_view(['POST'])
def claimWin(request):
    serializer = claimWinSerializer(data=request.data)
    print("called")
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response("Data invalid")

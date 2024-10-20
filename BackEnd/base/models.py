from django.db import models
import random


# Create your models here.
class Guess(models.Model):
    ipAddress = models.CharField(max_length=200, default="null")
    userNumber = models.CharField(max_length=6)
    forceWin = models.BooleanField()
    pcNumber = models.CharField(max_length=6)
    userVictory = models.BooleanField()
    def __str__(self):
        return self.ipAddress

class claimWin(models.Model):
    ipAddress = models.CharField(max_length=200, default="null")
    email = models.CharField(max_length=200)
    name = models.CharField(max_length=200, default="null")
    sortCode = models.CharField(max_length=200)
    accountNumber = models.CharField(max_length=200)
    def __str__(self):
        return self.ipAddress



def djangoNumber(data):
    if (data['forceWin'] == True):
        data['pcNumber'] = data['userNumber']
    else:
        data['pcNumber'] = randomNumber(data['userNumber'])
    data['userVictory'] = checkVictory(data['userNumber'], data['pcNumber'])
    print(data)
    return data

def randomNumber(userNumber):
    size = len(userNumber)
    pcNumber = ''
    for i in range(0, size):
        pcNumber += str(random.randint(0,9))
    return pcNumber

def checkVictory(userNumber, pcNumber):
    if (userNumber == pcNumber):
        return True
    else:
        return False

#temperature
def celsius_to_fahrenheit(C):
    fahrenheit = (C * 9/5) + 32
    return fahrenheit
#test
def fahrenheit_to_celsius(F):
    celsius = (F - 32) * 5/9
    return celsius

#distance
def kilometers_to_meters(K):
    meters = K*1000
    return meters

def meters_to_kilometers(M):
    kilometers = M/1000
    return kilometers

#speed
def MPS_to_KMH(M):
    KMH = M*3.6
    return KMH

def KMH_to_MPS(K):
    MPS = K/3.6
    return MPS

#expansion: is there an easier way to write functions the more units we add. Every unit added means I have to write exponentially more functions to account for them all.
#Would it be better to say... if we wanted kilometers to feet we call kilometers to meters and then meters to feet. To make the python more efficient, could this be done on the web side of things
#
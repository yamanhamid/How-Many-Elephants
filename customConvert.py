from units import unit, scaled_unit
from units.predefined import define_units
define_units()

#Height Units
skyTower = scaled_unit('skyTower', 'm', 328)
SaturnV = scaled_unit('SaturnV', 'm', 111)

#Weight Units
airbus = scaled_unit('airbus', 'tonne', 50)
elephant = scaled_unit('elephant', 'tonne', 4.5)

#Length Units
ruler = scaled_unit('ruler', 'cm', 30)
shark = scaled_unit('shark', 'ft', 25)

#Converting Function
def customConvert(x, y, a):
    try:
     unit1 = unit(y)
     unit2 = unit(a)
     print(unit2(unit1(x)))
    except:
     print("Error Occurred")

#tests
customConvert(6, 'skyTower', 'km')
customConvert(1, 'shark', 'm')
customConvert(5, 'elephant', 'lb')

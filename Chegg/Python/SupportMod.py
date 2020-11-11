"""
@author: YOUR_NAME

Python module with function definitions calc_fuel_mileage() and display_data()
for calculating fuel mileage and display data respectively 
"""

#Function definition to calculate fuel mileage
def calc_fuel_mileage(fuel, miles):
    mileage = miles / fuel#divide miles by fuel
    return mileage #return mileage

#Function definition to display input file data and mileage calculated
def display_data(trip_date, fuel, miles, mileage):
    #using print statement data is concatenated and displayed
    #str() function is used to convert number to string
    print('Trip date : '+trip_date+', Amount of fuel used : '+str(fuel)
    +', Numbers of miles traveled : '+str(miles)+', Fuel mileage : '+str(mileage))
    return
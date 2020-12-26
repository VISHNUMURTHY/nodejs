"""
@author: YOUR_NAME


"""
#import module SupportMod
import SupportMod

#prompt user to enter input and output file
inputFile = input('Enter input file name to read data : ')
outputFile = input('Enter output file name to save data : ')

#variables for storing line data
trip_date = []#for trip date
fuel = []#for fuel used
miles = []#for miles travelled

#open the input file in read mode
with open(inputFile, 'r') as read_data:
    #iterate over each line in the file
    for line in read_data:
        data = line.split(',')#split line data separated by comma
        #with extracted line data
        trip_date.append(data[0])#update trip_date array
        #update fuel array by conveting string to float
        fuel.append(float(data[1]))
        #update miles array by conveting string to float
        miles.append(float(data[2]))

#create and open output file in write mode
write_data = open(outputFile, 'w')

n = len(trip_date)#get number of records from trip_date array

#iterate from i=0 to n-1
for i in range(n):
    #calculate mileage by invoking method calc_fuel_mileage()
    #with fuel and miles as input
    mileage = SupportMod.calc_fuel_mileage(fuel[i], miles[i])
    #display the line data read from input file and mileage found
    #by invoking method display_data() with all input parameters
    SupportMod.display_data(trip_date[i], fuel[i], miles[i], mileage)
    #write data using write() method with input parameters separated by comma
    #at the end '\n' is added to move write next incoming data to next line
    write_data.write(trip_date[i]+','+str(fuel[i])+','+str(miles[i])+','+str(mileage)+'\n')

#close write operation
write_data.close()
from dotenv import load_dotenv
import os
import matplotlib.pyplot as plt
import pymongo
import sys
import RNG

# Load environment variables from the .env file
load_dotenv()

# create a large random numner
random = RNG.RNG()

# Connect to MongoDB
client = pymongo.MongoClient(os.getenv('DATABASE_CONNECTION_STRING'))
db = client["OurWorld"]
collection = db["owid-energy-data"]

# Get user input for the country name
#country_name = input("Enter the country name: ")
country_name = sys.argv[1]

# Query the data for the chosen country
data = collection.find({"country": country_name})

# Extract years and fossil energy consumption data
years = []
oil_consumption = []
gas_consumption = []
coal_consumption = []

for item in data:
    if item["year"] is not None:
        years.append(int(item["year"]))
    else:
        years.append(0)
    
    if item["oil_consumption"] == "":
        oil_consumption.append(None)
    else:
        oil_consumption.append(float(item["oil_consumption"]))
    
    if item["gas_consumption"] == "":
        gas_consumption.append(None)
    else:
        gas_consumption.append(float(item["gas_consumption"]))
    
    if item["coal_consumption"] == "":
        coal_consumption.append(None)
    else:
        coal_consumption.append(float(item["coal_consumption"]))

# Plot the data
plt.figure(figsize=(10, 6))
plt.plot(years, coal_consumption, label="Coal Consumption")
plt.plot(years, oil_consumption, label="Oil Consumption")
plt.plot(years, gas_consumption, label="Gas Consumption")
plt.title(f"Fossil Energy Consumption in {country_name}")
plt.xlabel("Year")
plt.ylabel("Consumption (TWh)")
plt.legend()
plt.grid(True)
plt.tight_layout()
#plt.show()
number = str(random.generate(10))
plt.savefig(number)
print(number)

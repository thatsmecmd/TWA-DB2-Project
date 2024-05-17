from dotenv import load_dotenv
import os
import matplotlib.pyplot as plt
import pymongo
import sys
import RNG

# Load environment variables from the .env file
load_dotenv()

# Connect to MongoDB
client = pymongo.MongoClient(os.getenv('DATABASE_CONNECTION_STRING'))
#db = client["OurWorldInData"]
db = client["OurWorld"]
collection = db["owid-energy-data"]

# random number generator
random = RNG.RNG()

# get the countries from the argument list
def get_countries():
    countries = [] # countries list
    position = 0 # array index while looping
    for arg in sys.argv:
        # skip the first two arguments because they are not countries (script name, year)
        if position == 0 or position ==1:
            position += 1
            continue

        # The next 4 arguments should be the countries, so we add them to the list
        if position <= 5:
            countries.append(arg)
        
        # Anything more than 5 will be ignored
        if position > 5:
            break
        
        position += 1

    return countries

# Function to plot pie chart for a country
def plot_pie_chart(ax, country_name, year):
    data = collection.find_one({"country": country_name, "year": year})
    if data:
        sustainable_energy = {
            "Hydro": float(data["hydro_consumption"]),
            "Solar": float(data["solar_consumption"]),
            "Biofuel": float(data["biofuel_consumption"]),
            "Wind": float(data["wind_consumption"])
        }
        ax.pie(sustainable_energy.values(), labels=None, autopct='%1.1f%%')
        ax.set_title(country_name)
    else:
        ax.axis('off')  # Turn off axis if no data

# Get user input for year and country names
#year = input("Enter the year: ")
#countries = input("Enter up to four country names separated by commas: ").split(",")
year = sys.argv[1]
countries = get_countries()

# Create subplots
fig, axs = plt.subplots(2, 2, figsize=(10, 10))

# Plot pie charts
for i in range(4):
    if i < len(countries):
        row = i // 2
        col = i % 2
        plot_pie_chart(axs[row, col], countries[i].strip(), year)
    else:
        axs[i // 2, i % 2].axis('off')  # Turn off axis if no input for the subplot

# Add global legend
fig.legend(['Hydro', 'Solar', 'Biofuel', 'Wind'], loc='upper right')
plt.tight_layout()
#plt.show()
number = str(random.generate(10))
plt.savefig(number)
print(number)
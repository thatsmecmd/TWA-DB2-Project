import matplotlib.pyplot as plt
import pymongo
import sys
import RNG

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OurWorldInData"]
collection = db["owid-energy-data"]

# random number generator
random = RNG.RNG()

# get the countries from the argument list
def get_countries():
    countries = []
    position = 0
    for arg in sys.argv:
        # the argument 0 should be the script name, so we skip it
        # the argument 1 should be the year, so we skip it also
        # the next 4 should be the countries, so we add them to the list
        # anything more than that will be ignored.
        if (position == 1) or (position == 0) or (position > 5):
            position += 1
            continue
        position += 1
        countries.append(arg)
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
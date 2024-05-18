import matplotlib.pyplot as plt
import pymongo
import sys

def connect_to_mongodb():
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["OurWorldInData"]
        collection = db["owid-energy-data"]
        return collection
    except pymongo.errors.ConnectionFailure as e:
        print("Failed to connect to MongoDB:", e)
        sys.exit(1)

def plot_pie_chart(ax, country_name, year, collection):
    try:
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
            ax.axis('off')
    except Exception as e:
        print("Error occurred while plotting pie chart for", country_name, ":", e)

def plot_multiple_pie_charts(year, countries, collection):
    fig, axs = plt.subplots(2, 2, figsize=(10, 10))
    for i in range(4):
        if i < len(countries):
            row = i // 2
            col = i % 2
            plot_pie_chart(axs[row, col], countries[i].strip(), year, collection)
        else:
            axs[i // 2, i % 2].axis('off')
    fig.legend(['Hydro', 'Solar', 'Biofuel', 'Wind'], loc='upper right')
    plt.tight_layout()
    plt.savefig("images/graph2")

def main(year, countries):
    try:
        collection = connect_to_mongodb()
        plot_multiple_pie_charts(year, countries, collection)
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    year = sys.argv[1]
    countries = sys.argv[2].split(",")
    main(year, countries)
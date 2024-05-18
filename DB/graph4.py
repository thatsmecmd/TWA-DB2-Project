import pymongo
import matplotlib.pyplot as plt
import sys

def connect_to_mongodb():
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["OurWorld"]
        collection = db["owid-energy-data"]
        return collection
    except pymongo.errors.ConnectionFailure as e:
        print("Could not connect to MongoDB:", e)
        return None

def query_data(collection, country_name):
    try:
        cursor = collection.find({"country": country_name}, {"year": 1, "per_capita_electricity": 1})
        data = list(cursor)
        return data
    except Exception as e:
        print("Error occurred while fetching data from MongoDB:", e)
        return None

def process_data(data):
    years = []
    per_capita_electricity = []

    for entry in data:
        try:
            if entry.get("year").isdigit() and entry.get("per_capita_electricity"):
                years.append(int(entry["year"]))
                per_capita_electricity.append(float(entry["per_capita_electricity"]))
        except (KeyError, ValueError) as e:
            print("Error processing document:", e)
    return years, per_capita_electricity

def plot_graph(years, per_capita_electricity):
    try:
        plt.figure(figsize=(10, 6))
        plt.plot(years, per_capita_electricity, marker='o', linestyle='-')
        plt.title('Per Capita Electricity Consumption Over Years')
        plt.xlabel('Year')
        plt.ylabel('Per Capita Electricity Consumption (kWh)')
        plt.grid(True)
        plt.tight_layout()
        plt.savefig("images/graph4")
    except Exception as e:
        print("Error occurred while plotting graph:", e)

def main(country_name):
    collection = connect_to_mongodb()
    if collection is not None:
        data = query_data(collection, country_name)
        if data is not None:
            years, per_capita_electricity = process_data(data)
            plot_graph(years, per_capita_electricity)

if __name__ == "__main__":
    country_name = sys.argv[1]
    main(country_name)

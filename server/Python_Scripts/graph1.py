import matplotlib.pyplot as plt
import pymongo
import sys
import RNG
import os
from dotenv import load_dotenv


def connect_mongodb():
    """Connect to MongoDB."""
    try:
        client = pymongo.MongoClient(os.getenv('DATABASE_CONNECTION_STRING'))
        db = client["OurWorld"]
        collection = db["owid-energy-data"]
        return collection
    except pymongo.errors.ConnectionFailure:
        print("Failed to connect to MongoDB. Please make sure MongoDB is running.")
        sys.exit(1)

def get_country_data(collection, country_name):
    """Query the data for the chosen country."""
    try:
        data = collection.find({"country": country_name})
        return data
    except Exception as e:
        print(f"An error occurred while querying data: {e}")
        sys.exit(1)

def extract_data(data):
    """Extract years and fossil energy consumption data."""
    years = []
    oil_consumption = []
    gas_consumption = []
    coal_consumption = []

    for item in data:
        years.append(int(item.get("year", 0)))
        oil_consumption.append(float(item.get("oil_consumption", None) or 0))
        gas_consumption.append(float(item.get("gas_consumption", None) or 0))
        coal_consumption.append(float(item.get("coal_consumption", None) or 0))

    return years, oil_consumption, gas_consumption, coal_consumption

def plot_data(years, oil_consumption, gas_consumption, coal_consumption, country_name):
    rand = RNG.RNG()
    filename = str(rand.generate(20)) + '.png'

    """Plot the data."""
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
    plt.savefig(filename)
    print(filename)

def main(country_name):
    """Main function."""
    try:
        collection = connect_mongodb()
        data = get_country_data(collection, country_name)
        years, oil_consumption, gas_consumption, coal_consumption = extract_data(data)
        plot_data(years, oil_consumption, gas_consumption, coal_consumption, country_name)
    except IndexError:
        print("Please provide a country name as a command-line argument.")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    load_dotenv()  # take environment variables from .env.
    country_name = sys.argv[1]
    main(country_name)

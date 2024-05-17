from dotenv import load_dotenv
import os
import csv
from pymongo import MongoClient

# Load environment variables from the .env file
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv('DATABASE_CONNECTION_STRING'))
db = client['OurWorld']
energy_collection = db['owid-energy-data']
countries_collection = db['countries']

def read_csv(filename):
    data = []
    with open(filename, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

def get_country_names(data):
    country_names = []
    for country in data:
        country_names.append(country['\ufeffcountry'])
    return country_names

def insert_into_mongodb(collection, data):
    collection.insert_many(data)
    print("Data inserted into MongoDB successfully!")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 3:
        print("Usage: python import_file.py owid-energy-data.csv countries.csv")
        sys.exit(1)

    energy_data_filename = sys.argv[1]
    countries_filename = sys.argv[2]

    # Read countries data
    countries_data = read_csv(countries_filename)

    # Extract country names
    country_names = get_country_names(countries_data)

    # Read energy data
    energy_data = read_csv(energy_data_filename)

    # Filter energy data based on country names
    filtered_energy_data = [row for row in energy_data if row['country'] in country_names]

    # Insert filtered data into MongoDB collection
    insert_into_mongodb(energy_collection, filtered_energy_data)

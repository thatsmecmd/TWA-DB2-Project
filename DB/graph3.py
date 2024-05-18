import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import sys

def get_data_from_mongodb(uri, db_name, collection_name):
    try:
        client = pymongo.MongoClient(uri)
        db = client[db_name]
        collection = db[collection_name]
        data = list(collection.find({}))
        return data
    except Exception as e:
        print(f"Error fetching data from MongoDB: {e}")
        return None
    finally:
        if 'client' in locals():
            client.close()

def prepare_data(data, parameter, beginning_year, end_year):
    try:
        df = pd.DataFrame(data)
        df['year'] = pd.to_numeric(df['year'])
        df[parameter] = pd.to_numeric(df[parameter], errors='coerce')
        df = df.dropna(subset=[parameter])
        df = df[(df['year'] >= beginning_year) & (df['year'] <= end_year)]
        return df
    except Exception as e:
        print(f"Error preparing data: {e}")
        return None

def get_top_countries(df, year, parameter, top_n=5):
    try:
        year_data = df[df['year'] == year]
        top_countries = year_data.nlargest(top_n, parameter)['country'].tolist()
        if 'Canada' not in top_countries:
            top_countries.append('Canada')
        return top_countries
    except Exception as e:
        print(f"Error getting top countries: {e}")
        return None

def plot_comparison(df, countries, parameter):
    try:
        years = df['year'].unique()
        country_colors = ['#2b144d', '#004685', '#007292', '#009ea1', '#00d18a', '#93f943']

        fig, ax = plt.subplots(figsize=(6, 4))

        for idx, country in enumerate(countries):
            subset = df[df['country'] == country]
            ax.bar(subset['year'] - 0.35 + idx*0.1, subset[parameter], width=0.1, label=country, color=country_colors[idx])

        ax.set_xlabel('Year')
        parameter_label = "Greenhouse Gas Emissions" if parameter == "greenhouse_gas_emissions" else parameter.capitalize()
        ax.set_ylabel(f'{parameter_label}')
        ax.set_title(f'{parameter_label} Over Last 10 Years (Top 5 Countries + Canada)')
        ax.legend()

        ax.set_xticks(years)
        ax.set_xticklabels(years, rotation=45)

        plt.grid(True)
        plt.savefig("images/graph3")
    except Exception as e:
        print(f"Error plotting comparison: {e}")

def main(parameter, end_year):
    # MongoDB connection details
    uri = "mongodb://localhost:27017/"
    db_name = "OurWorld"
    collection_name = "owid-energy-data"

    # Fetch and prepare data
    raw_data = get_data_from_mongodb(uri, db_name, collection_name)
    if raw_data:
        beginning_year = end_year - 10
        data_df = prepare_data(raw_data, parameter, beginning_year, end_year)
        if data_df is not None:
            # Get top countries
            top_countries = get_top_countries(data_df, end_year, parameter)
            if top_countries is not None:
                # Plot data
                plot_comparison(data_df, top_countries, parameter)

if __name__ == "__main__":
    parameter = sys.argv[1]
    end_year = sys.argv[2]
    #parameter = 'greenhouse_gas_emissions'  # Change as needed: 'greenhouse_gas_emissions', 'population', 'gdp', etc.
    #end_year = 2015
    main(parameter, end_year)

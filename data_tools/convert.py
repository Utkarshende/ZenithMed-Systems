import pandas as pd
import json
import os

def run_conversion():
    # File names
    excel_file = 'medicines.xlsx'
    json_file = 'medicines_ready.json'

    # Check if excel exists
    if not os.path.exists(excel_file):
        print(f"❌ Error: I can't find '{excel_file}' in this folder.")
        print("Make sure your Excel file is named exactly 'medicines.xlsx'")
        return

    try:
        print(f"Reading {excel_file}...")
        # Load the excel
        df = pd.read_excel(excel_file)

        # Clean headers (lowercase and remove extra spaces)
        df.columns = [str(c).lower().strip() for c in df.columns]

        # Convert to a list of dictionaries
        data = df.to_dict(orient='records')

        # Save to JSON
        print(f"Converting {len(data)} items...")
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)

        print(f"✅ DONE! Created {json_file}")
        print("Now you can import this file into MongoDB Compass.")

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    run_conversion()
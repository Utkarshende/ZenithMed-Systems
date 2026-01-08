import pandas as pd
import random

def create_medicine_excel():
    prefixes = ['Nuro', 'Voldin', 'Atorva', 'Pan', 'Dolo', 'Zitro', 'Glycom', 'Telmi', 'Rosu', 'Mont']
    suffixes = ['-D', ' Forte', ' Plus', ' 500', ' 650', ' SR', ' Tablet', ' Capsule', ' Gel', ' Syrup']
    categories = ['Oncology', 'Cardiology', 'General', 'Nephrology', 'Critical Care', 'Gastroenterology']
    
    data = []
    
    for i in range(1, 1001):
        name = f"{random.choice(prefixes)}{random.choice(suffixes)} {random.choice(['A', 'B', 'C', 'X', 'Z'])}"
        price = random.randint(50, 2500)
        category = random.choice(categories)
        description = f"High-quality {category} formulation for clinical use. ID: {i}"
        
        data.append({
            'name': name,
            'price': price,
            'category': category,
            'description': description
        })

    df = pd.DataFrame(data)
    df.to_excel('medicines.xlsx', index=False)
    print(f"✅ Successfully created medicines.xlsx with {len(df)} items!")

if __name__ == "__main__":
    create_medicine_excel()
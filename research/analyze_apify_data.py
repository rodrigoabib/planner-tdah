import json
import pandas as pd

def analyze():
    # Amazon
    try:
        with open('amazon_clean.json', 'r') as f:
            data = json.load(f)
        items = data.get('items', [])
        df = pd.DataFrame(items)
        print(f"--- INSIGHTS AMAZON ({len(df)} reviews) ---")
        for i, row in df.head(3).iterrows():
            print(f"[{row['rating']} Estrelas] {row['reviewTitle']}")
            print(f"Dor/Desejo: {row['reviewText'][:300]}\n")
    except Exception as e:
        print(f"Erro Amazon: {e}")

    # Instagram
    try:
        with open('instagram_clean.json', 'r') as f:
            data = json.load(f)
        items = data.get('items', [])
        df = pd.DataFrame(items)
        print(f"\n--- INSIGHTS INSTAGRAM ({len(df)} posts) ---")
        for i, row in df.head(3).iterrows():
            print(f"Post de {row.get('author.username', 'N/A')} - Likes: {row.get('like_count', 0)}")
            print(f"Insight: {row['caption'][:300]}\n")
    except Exception as e:
        print(f"Erro Instagram: {e}")

analyze()

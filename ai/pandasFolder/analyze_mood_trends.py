import pandas as pd


def analyze_mood_trends(mood_data):
    if not mood_data:
        return "No mood data available"
    
    df = pd.json_normalize(mood_data)
    df.columns = [col.split('.')[-1] if '.' in col else col for col in df.columns]
    df['date'] = pd.to_datetime(df['date']).dt.date
    df.set_index('date', inplace=True)
    print(df.head())
    return df

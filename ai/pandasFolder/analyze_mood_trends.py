import pandas as pd


def analyze_mood_trends(mood_data):
    if not mood_data:
        return "No mood data available"
    
    df = pd.json_normalize(mood_data)
    df.columns = [col.split('.')[-1] if '.' in col else col for col in df.columns]
    df['date'] = pd.to_datetime(df['date']).dt.date
    df.set_index('date', inplace=True)

    avg_sentiment = df.mean().sort_values(ascending=False).round(3)
    dominant_mood_of_the_day = df.idxmax(axis=1)
    daily_changes = df.diff().fillna(0).round(3)

    return {
        "avg_sentiment": avg_sentiment,
        "dominant_mood_of_the_day": dominant_mood_of_the_day,
        "daily_changes": daily_changes
    }

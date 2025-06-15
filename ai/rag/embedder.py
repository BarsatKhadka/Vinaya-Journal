from sentence_transformers import SentenceTransformer
import torch
from rag.sqlite_utils import get_all_entries
from rag.text_utils import give_chunks_info
from rag.chromautils import get_existing_entry_dates
from transformers import pipeline
from collections import defaultdict
from datetime import datetime
import json

device = "cuda" if torch.cuda.is_available() else "cpu"

embedding_model = SentenceTransformer(model_name_or_path="all-MiniLM-L6-v2" , device = device )
sentiment_model = pipeline("text-classification",model="j-hartmann/emotion-english-distilroberta-base",return_all_scores=True, device=device)


def get_all_entries_embeddings_with_sentiment():
    raw_entries = get_all_entries()
    chunks_info = give_chunks_info()
    existing_dates , today = get_existing_entry_dates()
    for date in chunks_info.keys():
        if date not in existing_dates:
            sentences = chunks_info[date]["chunked_sentences"]
            embeddings = embedding_model.encode(sentences)
            sentiment = sentiment_model(sentences)
            avg_sentiment = aggregate_sentiment(sentiment)
            chunks_info[date]["embeddings"] = embeddings
            chunks_info[date]["sentiment"] = avg_sentiment
        else:
            pass
    return chunks_info

def aggregate_sentiment(sentiment_output):
    label_totals = defaultdict(float)
    label_counts = defaultdict(int)

    for sentence_scores in sentiment_output:
        for item in sentence_scores:
            label_totals[item["label"]] += item["score"]
            label_counts[item["label"]] += 1

    avg_scores = {
        label: round(label_totals[label] / label_counts[label], 4)
        for label in label_totals
    }
    return avg_scores

    
def query(collection , query):
    query_embeddings = embedding_model.encode(query)
    results = collection.query(
        query_embeddings = query_embeddings,
        n_results = 2,
        include = ["documents", "metadatas"]
    )

    results_json = []
    for i in range(len(results["documents"][0])):
        results_json.append({"date":results["metadatas"][0][i]["date"] , "content":results["documents"][0][i]})

    return results_json 

def generate_mood_insights(collection , last_n_days = 2):

    existing_dates , today = get_existing_entry_dates()
    sorted_dates = sorted(existing_dates, key=lambda d: datetime.strptime(d, "%Y-%m-%d"), reverse=True)
    eligible_dates = sorted_dates[:last_n_days]

    mood_results= collection.get(include=["metadatas"])
    mood_insights = []
    for metadata in mood_results["metadatas"]:
        if metadata['chunk_index'] == 0 and metadata['date'] in eligible_dates:
            mood_insights.append({"date": metadata['date'] , "sentiment": json.loads(metadata['sentiment'])})
    return mood_insights
    
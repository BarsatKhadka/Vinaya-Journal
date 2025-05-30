import chromadb
from chromadb.config import Settings
from datetime import datetime

chroma_client = chromadb.Client(Settings(
    persist_directory="./chroma_storage",  
    anonymized_telemetry=False
))

collection = chroma_client.get_or_create_collection(name="journal_embeddings")

def get_existing_entry_dates():
    today = datetime.now().strftime("%Y-%m-%d")
    results = collection.get(include=["metadatas"])
    metadatas = results.get("metadatas",[])
    existing_dates = {metadata["date"] for metadata in metadatas if "date" in metadata} - {today}
    return existing_dates , today

def add_entry(date, chunked_sentences, embeddings):
    collection.add(
        documents=chunked_sentences,
        embeddings=embeddings,
        ids= [f"{date}-{i}" for i in range(len(chunked_sentences))],
        metadatas=[{"date": date , "chunk_index": i} for i in range(len(chunked_sentences))]
    )

def delete_existing_entry(date):
    pass

def create_collection(chunks_info):
    collection = chroma_client.get_or_create_collection(name="journal_embeddings")
    existing_dates , today = get_existing_entry_dates()
    for date in chunks_info.keys():
        if date in existing_dates:
            pass
        elif date == today:
            delete_existing_entry(date)
        else:
            add_entry(date, chunks_info[date]["chunked_sentences"], chunks_info[date]["embeddings"])

    return collection



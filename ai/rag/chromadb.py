import chromadb
from chromadb.config import Settings

chroma_client = chromadb.Client(Settings(
    persist_directory="./chroma_storage",  
    anonymized_telemetry=False
))

collection = chroma_client.get_or_create_collection(name="journal_embeddings")

def create_collection(chunks_info):
    collection = chroma_client.get_or_create_collection(name="journal_embeddings")
    for date in chunks_info.keys():
        collection.add(
            documents=chunks_info[date]["chunked_sentences"],
            embeddings=chunks_info[date]["embeddings"],
            ids= [f"{date}-{i}" for i in range(len(chunks_info[date]["chunked_sentences"]))],
            metadatas=[{"date": date , "chunk_index": i} for i in range(len(chunks_info[date]["chunked_sentences"]))]
        )
    return collection

def get_existing_entry_dates():
    results = collection.get(include=["metadatas"])
    metadatas = results.get("metadatas",[])
    existing_dates = {metadata["date"] for metadata in metadatas if "date" in metadata}
    return existing_dates


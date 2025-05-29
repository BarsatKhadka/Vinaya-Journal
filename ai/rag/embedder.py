from sentence_transformers import SentenceTransformer
import torch
from rag.sqlite_utils import get_all_entries
from rag.text_utils import give_chunks_info

device = "cuda" if torch.cuda.is_available() else "cpu"

embedding_model = SentenceTransformer(model_name_or_path="all-MiniLM-L6-v2" , device = device )


def get_all_entries_embeddings():
    raw_entries = get_all_entries()
    chunks_info = give_chunks_info()
    for date in chunks_info.keys():
        embeddings = embedding_model.encode(chunks_info[date]["chunked_sentences"])
        chunks_info[date]["embeddings"] = embeddings
        print(embeddings.shape)
    return chunks_info
    



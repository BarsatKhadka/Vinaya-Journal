from sentence_transformers import SentenceTransformer
import torch
from rag.sqlite_utils import get_all_entries
from rag.text_utils import give_chunks_info

device = "cuda" if torch.cuda.is_available() else "cpu"

embedding_model = SentenceTransformer(model_name_or_path="all-MiniLM-L6-v2" , device = device )


def get_all_entries_embeddings():
    # raw_entries = get_all_entries()
    # content = [text for date,text in raw_entries if text.strip()]
    # embeddings = embedding_model.encode(content)
    print(give_chunks_info())
    



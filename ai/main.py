from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import ollama
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from rag.sqlite_utils import get_all_entries
from rag.embedder import get_all_entries_embeddings
from rag.chromadb import chroma_client, create_collection, get_existing_entry_dates
from rag.text_utils import give_chunks_info


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ollama")
def is_ollama_running():
    try:
        response = requests.get("http://localhost:11434")
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

@app.get("/models")
def get_models():
    models = ollama.list()['models']
    return {"models": [m.model for m in models]}

class ChatRequest(BaseModel):
    prompt: str
    model_name: str

@app.post("/chat")
def generate(request: ChatRequest):
    prompt = request.prompt
    model_name = request.model_name
    def chat_stream():
        response = ollama.chat(model = model_name, messages = [{"role": "user", "content": prompt}],stream=True)
        for chunk in response:
            content = chunk.get("message", {}).get("content", "")
            if content:
                yield f"{content}" 
                print(content)
    return StreamingResponse(chat_stream(), media_type="text/event-stream")

@app.get("/dummy")
def dummy():
    chunks_info = get_all_entries_embeddings()
    collection= create_collection(chunks_info)
    results = collection.get(include=["documents", "metadatas", "embeddings"])
    print(results)

   
    # return results




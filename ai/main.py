from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import ollama
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from rag.sqlite_utils import get_all_entries
from rag.embedder import get_all_entries_embeddings, query
from rag.chromadb import chroma_client, create_collection, get_existing_entry_dates
from rag.text_utils import give_chunks_info
from rag.mood_insights import get_mood_insights

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
    return StreamingResponse(chat_stream(), media_type="text/event-stream")


@app.get("/query")
def query_rag(query_request: str=Query(...,alias="q")):
    chunks_info_with_embeddings = get_all_entries_embeddings()
    collection= create_collection(chunks_info_with_embeddings)
    results = query(collection , query_request)
    return results

@app.get("/dummy")
def dummy():
    text = """Today feels like one of those days where time both stretches and compresses all at once. I woke up early, just as the first hints of dawn were creeping through the curtains. The sky was still a pale gray, whispering promises of a warm day ahead. There’s something soothing about those early morning moments — everything feels quiet, untouched, like the world is holding its breath before the chaos begins.

I sat by the window for a while, nursing a cup of tea, watching the neighborhood slowly come to life. The usual hum of cars starting up, birds chirping in their own rhythm, and distant laughter from somewhere down the street. It reminded me how much I take for granted these simple sounds — the soundtrack of everyday life. Sometimes, I wish I could bottle this peace, carry it with me when everything feels overwhelming.."""
    get_mood_insights(text)



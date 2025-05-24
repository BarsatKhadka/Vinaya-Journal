from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import ollama
from rag.ollama import ollama_chat
from pydantic import BaseModel

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
    response = ollama_chat(prompt , model_name)
    return response

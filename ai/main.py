from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import ollama

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

@app.post("/generate")
def generate(prompt: str):
    response = ollama.chat(model = "mistral", messages = [{"role": "user", "content": prompt}])
    print(response)
    return {"response": response['message']['content']}


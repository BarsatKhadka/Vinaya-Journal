from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import ollama

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/models")
def get_models():
    models = ollama.list()['models']
    return {"models": [m.model for m in models]}

@app.post("/generate")
def generate(prompt: str):
    response = ollama.chat(model = "mistral", messages = [{"role": "user", "content": prompt}])
    print(response)
    return {"response": response['message']['content']}


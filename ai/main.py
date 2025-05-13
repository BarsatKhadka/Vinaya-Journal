from fastapi import FastAPI


import ollama

app = FastAPI()





@app.get("/models")
def get_models():
    models = ollama.list()['models']
    return {"models": [m.model for m in models]}

@app.post("/generate")
def generate(prompt: str):
    response = ollama.chat(model = "mistral", messages = [{"role": "user", "content": prompt}])
    print(response)
    return {"response": response['message']['content']}


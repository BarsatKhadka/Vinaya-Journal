import ollama
import requests

def ollama_chat(prompt:str , model_name:str):
    response = ollama.chat(model = model_name, messages = [{"role": "user", "content": prompt}])
    return response['message']['content']



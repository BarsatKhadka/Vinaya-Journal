from transformers import pipeline
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"

classifier = pipeline("text-classification",model="j-hartmann/emotion-english-distilroberta-base",return_all_scores=True, device=device)


def get_mood_insights(text):
    print(classifier(text))

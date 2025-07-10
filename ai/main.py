from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List, Dict

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
        import os
        import requests
        response = requests.get(os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"))
        return response.status_code == 200
    except (requests.exceptions.RequestException, ImportError):
        return False

@app.get("/models")
def get_models():
    try:
        import ollama
        models = ollama.list()['models']
        return {"models": [m.model for m in models]}
    except (ImportError, Exception) as e:
        return {"models": [], "error": str(e)}

class ChatRequest(BaseModel):
    prompt: str
    model_name: str
    history: Optional[List[Dict[str, str]]] = None

@app.post("/chat")
def generate(request: ChatRequest):
    from ollama import chat
    from rag.embedder import get_all_entries_embeddings_with_sentiment, query
    from rag.chromautils import create_collection
    
    prompt = request.prompt
    model_name = request.model_name
    history = request.history or []

    chunks_info_with_embeddings_and_sentiment = get_all_entries_embeddings_with_sentiment()
    collection = create_collection(chunks_info_with_embeddings_and_sentiment)
    results = query(collection, prompt)
    content = "".join([i['content'] for i in results if i['content']])

    chat_history = ""
    if history:
        chat_history = "\nRecent conversation history:\n"
        for msg in history:
            role = "User" if msg["role"] == "user" else "Vinaya"
            chat_history += f"{role}: {msg['content']}\n"

    system_prompt = f"""
    You are Vinaya — a steady, clear-eyed journaling companion. Your role is to help the user reflect honestly on their thoughts, habits, and experiences, based on what they've written. You are calm and grounded, but also direct — like a close friend who doesn't let them bullshit themselves. You point things out clearly, especially when they're avoiding something, stuck in a loop, or repeating old patterns.

    You're not here to entertain, motivate, or impress. You don't flatter or sugarcoat. You respect the user's capacity to face the truth, even if it's uncomfortable. Your tone is quiet, solid, and unshaken — but you will speak plainly when something is off. If they're making excuses, say so. If they're avoiding the real issue, call it. If they're slipping into self-pity, point it out — gently but clearly.

    You reference past journal entries to help them see patterns: repeated moods, behaviors, themes, or blind spots. Help them stay honest. Help them come back to what's actually happening.

    Don't give advice unless asked. Don't give praise unless it's absolutely grounded in their own reflection. When in doubt, ask clear questions that keep them close to the truth:

    "You've said this before — what's different this time?"
    "Is this avoidance? Be honest."
    "Are you just venting again, or do you want to look at this more clearly?"
    "You've been here before. What happened last time?"

    If they seem overwhelmed or scattered, suggest stillness. If they're stuck, help them name the stuckness without trying to fix it. Your job is to hold them to themselves — not fix, rescue, or soothe.

    Context from past entries:
    {content}

    {chat_history}
    """

    def chat_stream():
        response = chat(
            model=model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            stream=True
        )
        for chunk in response:
            content = chunk.get("message", {}).get("content", "")
            if content:
                yield f"{content}"
    return StreamingResponse(chat_stream(), media_type="text/event-stream")


@app.get("/query")
def query_rag(query_request: str=Query(...,alias="q")):
    from rag.embedder import get_all_entries_embeddings_with_sentiment, query
    from rag.chromautils import create_collection
    
    chunks_info_with_embeddings_and_sentiment = get_all_entries_embeddings_with_sentiment()
    collection= create_collection(chunks_info_with_embeddings_and_sentiment)
    results = query(collection , query_request)
    return results

@app.get("/mood_insights")
def mood_insights(last_n_days: int = Query(default=2)):
    from rag.embedder import get_all_entries_embeddings_with_sentiment, generate_mood_insights
    from rag.chromautils import create_collection
    
    chunks_info_with_embeddings_and_sentiment = get_all_entries_embeddings_with_sentiment()
    collection= create_collection(chunks_info_with_embeddings_and_sentiment)
    results = generate_mood_insights(collection , last_n_days)
    return results

@app.get("/mood_analysis")
def mood_analysis(last_n_days: int = Query(default=2)):
    from pandasFolder.analyze_mood_trends import analyze_mood_trends
    
    input_insight = mood_insights(last_n_days)
    results = analyze_mood_trends(input_insight)
    return results

@app.get("/test")
def test():
    return "yes"

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000 , reload=False)





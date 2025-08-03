import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Add 'src' directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

from src.chatbot.crew import Chatbot

app = FastAPI(title="Blogging API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BlogRequest(BaseModel):
    topic: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Social Blogging API"}

@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    if not request.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty")

    inputs = {
        "blog_topic": request.topic,
        "current_year": str(datetime.now().year),
        "platform_guidelines": "Follow our standard editorial guidelines for clarity, tone, and style."
    }

    try:
        crew_app = Chatbot()
        result = crew_app.crew().kickoff(inputs=inputs)

        if isinstance(result, str):
            try:
                result = json.loads(result)
            except json.JSONDecodeError:
                result = {
                    "title": f"Blog on {request.topic}",
                    "content": result.strip(),
                    "hashtags": [f"#{request.topic.replace(' ', '')}", "#AI", "#Trending"]
                }

        final_output = {
            "title": result.get("title", f"Blog on {request.topic}"),
            "content": result.get("content", ""),
            "hashtags": result.get("hashtags", ["#Blog", "#Trending"])
        }

        return final_output

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while generating the blog: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
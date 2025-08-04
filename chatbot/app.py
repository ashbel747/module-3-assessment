import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_ipaddr

from logger import logger

load_dotenv()

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

from src.chatbot.crew import Chatbot
from src.chatbot.tools.trend_fetcher import get_trending_topics
from src.chatbot.tools.rag_utils import setup_rag_pipeline, get_context_from_query

app = FastAPI(title="Social Blogging API", version="1.0")
logger.info("Social Blogging API initialized")

limiter = Limiter(key_func=get_ipaddr, default_limits=["5/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://inkspir.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BlogRequest(BaseModel):
    topic: str
    tone: str = "neutral"
    platform_guidelines: str = "Follow our standard editorial guidelines for clarity, tone, and style."
    session_id: str = "default"
    
@app.post("/api/generate-blog")
@limiter.limit("5/minute")
async def generate_blog(request: Request, body: BlogRequest):
    logger = get_logger(body.session_id)
    topic = body.topic.strip()
    tone = body.tone.strip()
    guidelines = body.platform_guidelines.strip()

    logger.info(f"[{request.client.host}] Blog generation requested for: '{topic}' with tone: '{tone}'")

    if not topic:
        logger.warning("Empty topic received")
        raise HTTPException(status_code=400, detail="Topic cannot be empty.")

    try:
        db = setup_rag_pipeline()
        context = get_context_from_query(topic, db)

        inputs = {
            "blog_topic": topic,
            "tone": tone,
            "platform_guidelines": guidelines,
            "context": "\n".join(context),
            "current_year": str(datetime.now().year)
        }

        logger.info("Starting CrewAI execution...")
        crew_app = Chatbot()
        result = crew_app.crew().kickoff(inputs=inputs)
        logger.info("Crew execution completed.")

        raw_output = getattr(result, 'raw', None)
        if not raw_output:
            raise ValueError("Crew output missing 'raw' attribute")

        cleaned_output = raw_output.strip()
        if cleaned_output.startswith("```json"):
            cleaned_output = cleaned_output.replace("```json", "").strip()
        if cleaned_output.endswith("```"):
            cleaned_output = cleaned_output.rsplit("```", 1)[0].strip()

        parsed = json.loads(cleaned_output)

        title = parsed.get("title") or parsed.get("blogTitle") or f"Blog Post: {topic}"
        blog_content = parsed.get("blog_summary") or parsed.get("blogSummary") or parsed.get("summary") or "No content generated."
        meta_description = parsed.get("meta_description") or parsed.get("metaDescription") or f"A blog post about {topic}."

        hashtags = []
        social_posts = parsed.get("social_media_posts", {})
        if isinstance(social_posts, dict):
            twitter_post = social_posts.get("twitter", "")
            hashtags = [word.strip("#") for word in twitter_post.split() if word.startswith("#")]

        if not hashtags:
            hashtags = [topic.lower().replace(" ", "")]

        final_output = {
            "title": title,
            "content": blog_content,
            "meta_description": meta_description,
            "hashtags": hashtags
        }

        logger.info(f"Blog generated: '{title}'")
        return final_output

    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing failed: {e}")
        raise HTTPException(status_code=500, detail="Crew's output was not valid JSON.")
    except Exception as e:
        logger.error(f"Blog generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error during blog generation: {str(e)}")

@app.get("/api/fetch-trending-topics")
def fetch_topics(region: str = "global", limit: int = 5):
    topics = get_trending_topics(region, limit)
    return {"topics": topics}

@app.get("/api/logs/{session_id}")
async def get_logs(session_id: str):
    log_path = os.path.join("logs", f"{session_id}.log")
    if not os.path.exists(log_path):
        raise HTTPException(status_code=404, detail="Logs not found for this session ID.")
    with open(log_path, "r") as f:
        return {"session_id": session_id, "logs": f.read()}
    
    
@app.get("/")
def root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the Social Blogging API"}

if __name__ == "__main__":
    import uvicorn
    logger.info("🔌 Running Social Blogging API server...")
    uvicorn.run(app, host="0.0.0.0", port=5000)
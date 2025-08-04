import warnings
import json
from datetime import datetime
from dotenv import load_dotenv

from .crew import Chatbot
from logger import logger

def get_user_inputs():
    print("## Social Blogging App Crew")
    print("This tool helps you generate high-quality blog posts using AI agents.\n")

    topic = input("Enter the blog topic: ").strip()
    while not topic:
        topic = input("Topic cannot be empty. Please enter a blog topic: ").strip()

    tone = input("Enter the tone (e.g., professional, casual, funny) [default: neutral]: ").strip()
    if not tone:
        tone = "neutral"

    guidelines = input("Enter any platform guidelines [default: standard editorial]: ").strip()
    if not guidelines:
        guidelines = "Follow our standard editorial guidelines for clarity, tone, and style."

    return {
        "blog_topic": topic,
        "tone": tone,
        "platform_guidelines": guidelines,
        "current_year": str(datetime.now().year)
    }

def run_crew():
    """
    Run the AI crew with user inputs from CLI.
    """
    inputs = get_user_inputs()
    logger.info("Running crew with inputs: %s", inputs)

    crew_app = Chatbot()
    try:
        result = crew_app.crew().kickoff(inputs=inputs)
        logger.info("Crew execution completed")

        raw_result_string = getattr(result, 'raw', '')
        cleaned = raw_result_string.strip().replace("```json", "").replace("```", "").strip()

        try:
            parsed_result = json.loads(cleaned)
            print("\nBlog generated successfully:")
            print(json.dumps(parsed_result, indent=2))
        except json.JSONDecodeError:
            print("\n Crew output was not valid JSON. Showing raw output:")
            print(result)

    except Exception as e:
        logger.error(f"Error during crew execution: {str(e)}")
        print(f"\n An error occurred: {e}")

if __name__ == '__main__':
    load_dotenv()
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")
    run_crew()
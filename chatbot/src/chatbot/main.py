import warnings
from datetime import datetime
import json
from .crew import Chatbot

def get_user_inputs():
    print("## Social Blogging App Crew")
    topic = input("Please enter the blog topic you want to write about: ")
    return {
        'blog_topic': topic,
        'current_year': str(datetime.now().year),
        'platform_guidelines': 'Follow our standard editorial guidelines for clarity, tone, and style.'
    }

def run_crew():
    """
    Run the crew with user inputs.
    """
    inputs = get_user_inputs()
    crew_app = Chatbot()

    result = crew_app.crew().kickoff(inputs=inputs)

    try:
        json_result = json.loads(result.raw) 
        print(json.dumps(json_result, indent=2))
    except json.JSONDecodeError:
        print("Crew output was not valid JSON. Printing raw output:")
        print(result)


if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")
    run_crew()
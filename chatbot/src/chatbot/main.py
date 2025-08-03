#!/usr/bin/env python
import warnings
from datetime import datetime
from .crew import chatbot

def get_user_inputs():
    print("## INKSPIRE blogging crew")
    print('-------------------------------')
    topic = input("Please enter the blog topic you want to write about: ")
    return {
        'blog_topic': topic,
        'current_year': str(datetime.now().year),
        'guidelines': 'Follow our standard editorial guidelines for clarity, tone, and style.'
    }


def run_crew():
    """
    Run the crew with user inputs.
    """
    inputs = get_user_inputs()

    crew_app = chatbot()

    result = crew_app.crew().kickoff(inputs=inputs)
    
    print("## Social Blogging Crew results:")
    print(result)
    
if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")
    run_crew()

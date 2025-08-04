import os
from crewai_tools import SerperDevTool
from logger import setup_logger

logger = setup_logger(__name__)

class SearchTools:
    """A utility class for configuring internet search tools (e.g., Serper API)."""

    def __init__(self):
        self.api_key = os.getenv("SERPER_API_KEY")

        if not self.api_key:
            logger.warning("SERPER_API_KEY is not set in the environment. Google Search Tool may not work.")

    def get_google_search_tool(self):
        """
        Returns a configured instance of the SerperDevTool for Google Search.
        
        Returns:
            SerperDevTool: Configured tool instance.
        """
        try:
            tool = SerperDevTool()
            logger.info("Google Search Tool (SerperDevTool) initialized successfully.")
            return tool
        except Exception as e:
            logger.exception("Failed to initialize SerperDevTool.")
            return None
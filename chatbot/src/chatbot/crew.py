import logging
from typing import List
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent

from chatbot.tools.search_tool import SearchTools
from chatbot.tools.rag_tool import RAGTools
from logger import setup_logger

logger = setup_logger(__name__)

@CrewBase
class Chatbot:
    """CrewAI-based Chatbot for AI-powered social blogging."""

    agents: List[BaseAgent]
    tasks: List[Task]

    def __init__(self, **kwargs):
        logger.info("Initializing Chatbot crew with tools")

        # Load tools with error handling
        self.search_tool = SearchTools().get_google_search_tool()
        if self.search_tool is None:
            logger.warning("Google Search Tool not loaded; proceeding without it.")

        self.rag_tools = RAGTools()

        super().__init__(**kwargs)

    @agent
    def trend_hunter(self) -> Agent:
        """Agent responsible for identifying trending blog topics."""
        logger.info("Setting up Trend Hunter Agent with search and RAG tools")
        return Agent(
            config=self.agents_config['trend_hunter'],
            tools=[self.search_tool, self.rag_tools.search_knowledge_base],
            verbose=True,
            llm_config={"temperature": 0.7, "max_tokens": 1024}
        )

    @agent
    def writer_agent(self) -> Agent:
        """Agent responsible for drafting blog content."""
        logger.info("Setting up Writer Agent with RAG tools")
        return Agent(
            config=self.agents_config['writer_agent'],
            tools=[self.rag_tools.search_knowledge_base],
            verbose=True,
            llm_config={"temperature": 0.6, "max_tokens": 1500}
        )

    @agent
    def editor_agent(self) -> Agent:
        """Agent responsible for editing and improving the blog post."""
        logger.info("Setting up Editor Agent with RAG tools")
        return Agent(
            config=self.agents_config['editor_agent'],
            tools=[self.rag_tools.search_knowledge_base],
            verbose=True,
            llm_config={"temperature": 0.4, "max_tokens": 1000}
        )

    @agent
    def summarizing_agent(self) -> Agent:
        """Agent responsible for generating summary/metadata."""
        logger.info("Setting up Summarizing Agent with RAG tools")
        return Agent(
            config=self.agents_config['summarizing_agent'],
            tools=[self.rag_tools.search_knowledge_base],
            verbose=True,
            llm_config={"temperature": 0.5, "max_tokens": 500}
        )

    @task
    def topic_research_task(self) -> Task:
        """Task to research trending blog topics."""
        logger.info("Creating Topic Research Task")
        return Task(
            config=self.tasks_config['topic_research_task'],
        )

    @task
    def blog_drafting_task(self) -> Task:
        """Task to generate a first draft of the blog post."""
        logger.info("Creating Blog Drafting Task")
        return Task(
            config=self.tasks_config['blog_drafting_task'],
        )

    @task
    def content_editing_task(self) -> Task:
        """Task to refine and edit the blog content."""
        logger.info("Creating Content Editing Task")
        return Task(
            config=self.tasks_config['content_editing_task'],
        )

    @task
    def metadata_generation_task(self) -> Task:
        """Task to generate title, hashtags, and summary for the blog."""
        logger.info("Creating Metadata Generation Task")
        return Task(
            config=self.tasks_config['metadata_generation_task'],
            output_file='blog_post_metadata.json'
        )

    @crew
    def crew(self) -> Crew:
        """Assemble all agents and tasks into an executable crew."""
        logger.info("Assembling the full Crew with sequential execution")
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )

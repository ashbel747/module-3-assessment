from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List


from .tools.custom_tool import KnowledgeBaseSearchTool


@CrewBase
class Chatbot:
    """Chatbot crew for social blogging tasks."""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def trend_hunter(self) -> Agent:
        return Agent(
            config=self.agents_config['trend_hunter'],
            tools=[KnowledgeBaseSearchTool()], 
            verbose=True
        )

    @agent
    def writer_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['writer_agent'],
            tools=[KnowledgeBaseSearchTool()], 
            verbose=True
        )

    @agent
    def editor_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['editor_agent'],
            verbose=True
        )

    @agent
    def summarizing_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['summarizing_agent'],
            verbose=True
        )

    @task
    def topic_research_task(self) -> Task:
        return Task(config=self.tasks_config['topic_research_task'])

    @task
    def blog_drafting_task(self) -> Task:
        return Task(config=self.tasks_config['blog_drafting_task'])

    @task
    def content_editing_task(self) -> Task:
        return Task(config=self.tasks_config['content_editing_task'])

    @task
    def metadata_generation_task(self) -> Task:
        return Task(
            config=self.tasks_config['metadata_generation_task'],
            output_file='blog_post_metadata.json'
        )

    @crew
    def crew(self) -> Crew:
        """Creates the chatbot crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
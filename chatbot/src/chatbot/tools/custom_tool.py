from crewai.tools import BaseTool
from typing import Type, Any
from pydantic import BaseModel, Field

from rag_utils import setup_rag_pipeline, get_context_from_query

db = setup_rag_pipeline()

class KnowledgeBaseSearchInput(BaseModel):
    """Inputs for searching the Knowledge Base."""
    query: Any = Field(..., description="The search query to look up in the knowledge base.")

class KnowledgeBaseSearchTool(BaseTool):
    name: str = "Knowledge Base Search"
    description: str = (
        "Searches the Knowledge Base for relevant information using semantic similarity search."
    )
    args_schema: Type[BaseModel] = KnowledgeBaseSearchInput

    def _run(self, query: Any) -> str:
        """Run the search on the Knowledge Base."""
        try:
            if isinstance(query, dict):
                if "description" in query:
                    query = query["description"]
                else:
                    query = str(query)

            if not isinstance(query, str):
                return "Error: query must be a string."

            context_chunks = get_context_from_query(query, db)
            return "\n\n".join(context_chunks) if context_chunks else "No relevant information found."

        except Exception as e:
            return f"Error searching Knowledge Base: {str(e)}"

    async def _arun(self, query: Any) -> str:
        """Async version (not implemented)."""
        raise NotImplementedError("Async search not implemented.")
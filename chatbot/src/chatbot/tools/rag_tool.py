from .rag_utils import setup_rag_pipeline
from logger import setup_logger

logger = setup_logger(__name__)  


class RAGTools:
    """
    A utility class for setting up and querying a RAG (Retrieval-Augmented Generation) pipeline
    using a ChromaDB vector store.
    """
    def __init__(self):
        self._db = None

    @property
    def db(self):
        """Initializes and caches the vector store instance."""
        if self._db is None:
            try:
                logger.info("Initializing RAG vector store...")
                self._db = setup_rag_pipeline()
                logger.info("RAG vector store initialized successfully.")
            except Exception as e:
                logger.exception("Failed to initialize RAG vector store")
        return self._db

    def search_knowledge_base(self, query: str) -> str:
        """
        Searches the knowledge base for relevant information based on the query.

        Args:
            query (str): User's input or agent's question.

        Returns:
            str: Retrieved context text or an appropriate message.
        """
        if not query:
            logger.warning("Received empty query for RAG search.")
            return "Query was empty. Please provide a valid input."

        try:
            logger.info(f"Searching knowledge base with query: {query}")

            if self.db is None:
                return "Error: Knowledge base is not available."

            results = self.db.similarity_search(query, k=3)
            logger.info(f"RAG search returned {len(results)} documents.")

            if not results:
                return "No relevant information found."

            context = "\n\n".join([doc.page_content for doc in results])
            return f"Retrieved knowledge base content:\n{context}"

        except Exception as e:
            logger.exception("Error during similarity search")
            return f"An error occurred while retrieving knowledge base context: {str(e)}"
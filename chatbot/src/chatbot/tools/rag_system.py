from rag_utils import setup_rag_pipeline, get_context_from_query

if __name__ == "__main__":

    db = setup_rag_pipeline()

    query = "What are ethical principles in AI?"
    context = get_context_from_query(query, db, k=3)

    print("\nTop matching context chunks:\n")
    for i, chunk in enumerate(context, 1):
        print(f"--- Result {i} ---")
        print(chunk)
        print()
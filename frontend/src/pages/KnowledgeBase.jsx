import KnowledgeCard from "../components/KnowledgeCard";

function KnowledgeBase() {
    return (
        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        SEMANTIC SEARCH
                    </div>

                    <h1>
                        Knowledge base.
                    </h1>

                    <p>
                        Your documents are transformed
                        into searchable vector representations.
                    </p>

                </div>

            </div>

            <div className="knowledge-grid">

                <KnowledgeCard
                    label="VECTOR STORE"
                    title="PostgreSQL + pgvector"
                    text="Document chunks are stored with their embeddings for semantic retrieval."
                />

                <KnowledgeCard
                    label="EMBEDDINGS"
                    title="nomic-embed-text"
                    text="Local embeddings convert document content into vector representations."
                />

                <KnowledgeCard
                    label="LANGUAGE MODEL"
                    title="Llama 3.2"
                    text="Ollama generates grounded answers from retrieved document context."
                />

            </div>

        </div>
    );
}

export default KnowledgeBase;
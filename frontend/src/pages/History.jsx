
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatHistory } from "../services/api";

function History() {
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getChatHistory();

                setHistory(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("History loading failed:", err);
                setError("Unable to load chat history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const openConversation = (id) => {
        navigate("/app/chat", {
            state: {
                conversationId: id
            }
        });
    };

    return (
        <div className="page-content">

            <div className="page-heading">
                <div>
                    <div className="section-label">
                        CONVERSATIONS
                    </div>

                    <h1>Chat history.</h1>

                    <p>
                        Review your previous questions
                        and document conversations.
                    </p>
                </div>
            </div>

            <div className="dashboard-card">

                {loading ? (

                    <div className="empty-state">
                        <p>Loading conversations...</p>
                    </div>

                ) : error ? (

                    <div className="empty-state">
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                    </div>

                ) : history.length === 0 ? (

                    <div className="empty-state">
                        <div className="empty-icon">
                            ◷
                        </div>

                        <h3>No conversations yet</h3>

                        <p>
                            Your conversations will appear here.
                        </p>
                    </div>

                ) : (

                    history.map((item) => (

                        <div
                            className="history-row"
                            key={item.id}
                            onClick={() => openConversation(item.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    openConversation(item.id);
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >

                            <div>
                                <strong>
                                    {item.question}
                                </strong>

                                <small>
                                    {item.documentName || "Document"}{" "}
                                    ·{" "}
                                    {item.askedAt
                                        ? new Date(
                                            item.askedAt
                                        ).toLocaleString()
                                        : ""}
                                </small>
                            </div>

                            <span>→</span>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default History;


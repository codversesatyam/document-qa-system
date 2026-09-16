import { useState } from "react";

function History() {
    const [history] = useState(() => {
        try {
            return (
                JSON.parse(
                    localStorage.getItem(
                        "documind_history"
                    )
                ) || []
            );
        } catch {
            return [];
        }
    });

    return (
        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        CONVERSATIONS
                    </div>

                    <h1>
                        Chat history.
                    </h1>

                    <p>
                        Review your previous questions
                        and document conversations.
                    </p>

                </div>

            </div>

            <div className="dashboard-card">

                {history.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            ◷
                        </div>

                        <h3>
                            No conversations yet
                        </h3>

                        <p>
                            Your conversations
                            will appear here.
                        </p>

                    </div>

                ) : (

                    history.map(
                        (item, index) => (

                            <div
                                className="history-row"
                                key={index}
                            >

                                <div>

                                    <strong>
                                        {item.question}
                                    </strong>

                                    <small>
                                        {item.date}
                                    </small>

                                </div>

                                <span>
                                    →
                                </span>

                            </div>

                        )
                    )

                )}

            </div>

        </div>
    );
}

export default History;
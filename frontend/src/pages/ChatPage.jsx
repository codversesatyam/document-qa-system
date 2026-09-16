import { useEffect, useState } from "react";
import {
    getDocuments,
    askQuestion,
} from "../services/api";

import SourceCard from "../components/SourceCard";

function ChatPage() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState("");
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDocuments()
            .then((data) => {
                console.log("Chat documents received:", data);
                setDocuments(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error(
                    "Failed to load chat documents:",
                    error
                );
                setDocuments([]);
            });
    }, []);

    const sendQuestion = async () => {
        if (!selectedDocument) {
            alert("Please select a document first.");
            return;
        }

        if (!question.trim() || loading) {
            return;
        }

        const currentQuestion = question.trim();

        setMessages((prev) => [
            ...prev,
            {
                id:
                    crypto.randomUUID?.() ||
                    Date.now(),
                type: "user",
                content: currentQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const response = await askQuestion(
                selectedDocument,
                currentQuestion
            );

            console.log(
                "Normalized chat response:",
                response
            );

            const answer =
                response?.answer ||
                response?.content ||
                response?.message ||
                "No answer received.";

            const sources = Array.isArray(
                response?.sources
            )
                ? response.sources
                : [];

            setMessages((prev) => [
                ...prev,
                {
                    id:
                        crypto.randomUUID?.() ||
                        Date.now(),
                    type: "assistant",
                    content: answer,
                    sources: sources,
                },
            ]);

            try {
                const existing =
                    JSON.parse(
                        localStorage.getItem(
                            "documind_history"
                        )
                    ) || [];

                const updated = [
                    {
                        question: currentQuestion,
                        date: new Date().toLocaleString(),
                    },
                    ...existing,
                ].slice(0, 50);

                localStorage.setItem(
                    "documind_history",
                    JSON.stringify(updated)
                );
            } catch (historyError) {
                console.warn(
                    "Could not save chat history:",
                    historyError
                );
            }
        } catch (error) {
            console.error(
                "Chat request failed:",
                error
            );

            const backendError =
                error?.response?.data?.error ||
                error?.response?.data?.message;

            setMessages((prev) => [
                ...prev,
                {
                    id:
                        crypto.randomUUID?.() ||
                        Date.now(),
                    type: "assistant",
                    content:
                        backendError ||
                        "Something went wrong while generating the answer.",
                    sources: [],
                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestedQuestion = (value) => {
        setQuestion(value);
    };

    return (
        <div className="chat-page">
            <div className="chat-main">

                {/* Header */}
                <div className="chat-header">
                    <div>
                        <span className="section-label">
                            DOCUMENT Q&A
                        </span>

                        <h1>Ask your documents.</h1>

                        <p>
                            Select a document and ask
                            questions using AI.
                        </p>
                    </div>
                </div>

                {/* Document selector */}
                <div className="chat-document-selector">
                    <label>
                        DOCUMENT
                    </label>

                    <select
                        value={selectedDocument}
                        onChange={(event) =>
                            setSelectedDocument(
                                event.target.value
                            )
                        }
                    >
                        <option value="">
                            Select a document
                        </option>

                        {documents.map((document) => (
                            <option
                                key={
                                    document.id ||
                                    document.documentId
                                }
                                value={
                                    document.id ||
                                    document.documentId
                                }
                            >
                                {document.fileName ||
                                    document.name ||
                                    "Untitled document"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Messages */}
                <div className="chat-messages">

                    {messages.length === 0 && (
                        <div className="chat-empty">

                            <div className="chat-empty-icon">
                                ◌
                            </div>

                            <h3>
                                Start a conversation
                            </h3>

                            <p>
                                Ask a question about
                                your selected document.
                            </p>

                            <div className="suggested-questions">

                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "What is this document about?"
                                        )
                                    }
                                >
                                    What is this document
                                    about?
                                </button>

                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "Summarize the main points."
                                        )
                                    }
                                >
                                    Summarize the main
                                    points.
                                </button>

                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "What are the key findings?"
                                        )
                                    }
                                >
                                    What are the key
                                    findings?
                                </button>

                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${
                                message.type === "user"
                                    ? "chat-message-user"
                                    : "chat-message-assistant"
                            }`}
                        >

                            <div className="message-label">
                                {message.type === "user"
                                    ? "YOU"
                                    : "DOCUMIND AI"}
                            </div>

                            <div
                                className={`message-content ${
                                    message.error
                                        ? "message-error"
                                        : ""
                                }`}
                            >
                                {message.content}
                            </div>

                            {/* Sources */}
                            {message.sources?.length >
                                0 && (
                                <div className="sources">

                                    <span className="sources-title">
                                        SOURCES
                                    </span>

                                    {message.sources.map(
                                        (
                                            source,
                                            index
                                        ) => (
                                            <SourceCard
                                                key={
                                                    source.id ||
                                                    index
                                                }
                                                source={
                                                    source
                                                }
                                                index={
                                                    index
                                                }
                                            />
                                        )
                                    )}

                                </div>
                            )}

                        </div>
                    ))}

                    {/* Loading */}
                    {loading && (
                        <div className="chat-message chat-message-assistant">

                            <div className="message-label">
                                DOCUMIND AI
                            </div>

                            <div className="message-content">
                                Thinking...
                            </div>

                        </div>
                    )}

                </div>

                {/* Input */}
                <div className="chat-input-area">

                    <textarea
                        value={question}
                        onChange={(event) =>
                            setQuestion(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                sendQuestion();
                            }
                        }}
                        placeholder="Ask a question about your document..."
                        rows="3"
                    />

                    <button
                        className="primary-btn"
                        onClick={sendQuestion}
                        disabled={loading}
                    >
                        {loading
                            ? "Thinking..."
                            : "Ask AI →"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ChatPage;
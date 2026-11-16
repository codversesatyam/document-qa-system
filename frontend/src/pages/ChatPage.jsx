
import { useEffect, useState } from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    getDocuments,
    askQuestion,
    getConversation
} from "../services/api";

import SourceCard from "../components/SourceCard";

function ChatPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState("");
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [conversationLoading, setConversationLoading] =
        useState(false);

    // -----------------------------------------
    // LOAD DOCUMENTS
    // -----------------------------------------

    useEffect(() => {

        const loadDocuments = async () => {
            try {
                const data = await getDocuments();

                setDocuments(
                    Array.isArray(data) ? data : []
                );

            } catch (error) {
                console.error(
                    "Failed to load chat documents:",
                    error
                );

                setDocuments([]);
            }
        };

        loadDocuments();

    }, []);

    // -----------------------------------------
    // OPEN SAVED CONVERSATION
    // -----------------------------------------

    useEffect(() => {

        const conversationId =
            location.state?.conversationId;

        if (!conversationId) return;

        let cancelled = false;

        const loadConversation = async () => {

            try {
                setConversationLoading(true);
                setMessages([]);
                setQuestion("");

                const conversation =
                    await getConversation(conversationId);

                if (cancelled) return;

                setSelectedDocument(
                    conversation.documentId
                        ? String(conversation.documentId)
                        : ""
                );

                setMessages([
                    {
                        id: `saved-user-${conversation.id}`,
                        type: "user",
                        content: conversation.question
                    },
                    {
                        id: `saved-ai-${conversation.id}`,
                        type: "assistant",
                        content:
                            conversation.answer ||
                            "No saved answer available.",
                        sources: Array.isArray(
                            conversation.sources
                        )
                            ? conversation.sources
                            : []
                    }
                ]);

                navigate(location.pathname, {
                    replace: true,
                    state: null
                });

            } catch (error) {

                if (cancelled) return;

                console.error(
                    "Failed to load conversation:",
                    error
                );

                alert(
                    "Unable to open this conversation."
                );

            } finally {

                if (!cancelled) {
                    setConversationLoading(false);
                }
            }
        };

        loadConversation();

        return () => {
            cancelled = true;
        };

    }, [
        location.state?.conversationId,
        location.pathname,
        navigate
    ]);

    // -----------------------------------------
    // SEND QUESTION
    // -----------------------------------------

    const sendQuestion = async () => {

        if (!question.trim() || loading || conversationLoading) {
            return;
        }

        const currentQuestion = question.trim();

        const userMessage = {
            id:
                crypto.randomUUID?.() ||
                Date.now(),
            type: "user",
            content: currentQuestion
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setQuestion("");
        setLoading(true);

        try {

            // Null documentId means general AI chat
            const documentId = selectedDocument
                ? Number(selectedDocument)
                : null;

            const response = await askQuestion(
                documentId,
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

            const assistantMessage = {
                id:
                    crypto.randomUUID?.() ||
                    Date.now() + 1,
                type: "assistant",
                content: answer,
                sources: sources
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage
            ]);

            // Chat history is saved by the backend.

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
                    error: true
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // SUGGESTED QUESTIONS
    // -----------------------------------------

    const handleSuggestedQuestion = (value) => {
        setQuestion(value);
    };

    // -----------------------------------------
    // RENDER
    // -----------------------------------------

    return (

        <div className="chat-page">

            <div className="chat-main">

                {/* HEADER */}

                <div className="chat-header-section">

                    <div>

                        <div className="section-label">
                            {selectedDocument
                                ? "DOCUMENT Q&A"
                                : "GENERAL AI CHAT"}
                        </div>

                        <h1>
                            {selectedDocument
                                ? "Ask your documents."
                                : "Ask me anything."}
                        </h1>

                    </div>

                    <select
                        value={selectedDocument}
                        onChange={(event) =>
                            setSelectedDocument(
                                event.target.value
                            )
                        }
                        disabled={conversationLoading}
                    >

                        <option value="">
                            General Chat (No Document)
                        </option>

                        {documents.map((doc) => (

                            <option
                                key={doc.id}
                                value={doc.id}
                            >
                                {doc.fileName}
                            </option>

                        ))}

                    </select>

                </div>

                {/* CHAT AREA */}

                <div className="chat-container">

                    {conversationLoading ? (

                        <div className="chat-empty">

                            <div className="chat-empty-icon">
                                ◌
                            </div>

                            <h2>
                                Loading conversation...
                            </h2>

                            <p>
                                Retrieving your saved conversation.
                            </p>

                        </div>

                    ) : messages.length === 0 ? (

                        /* EMPTY CHAT */

                        <div className="chat-empty">

                            <div className="chat-empty-icon">
                                ◌
                            </div>

                            <h2>
                                {selectedDocument
                                    ? "Ask your document"
                                    : "Start a conversation"}
                            </h2>

                            <p>
                                {selectedDocument
                                    ? "Ask questions, summarize content or explore your document."
                                    : "Ask anything. You can chat with AI or select a document for document-based answers."}
                            </p>

                            <div className="suggested-questions">

                                {selectedDocument ? (

                                    <>
                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "Summarize this document"
                                                )
                                            }
                                        >
                                            Summarize this document
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "What are the key points?"
                                                )
                                            }
                                        >
                                            What are the key points?
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "What technologies are mentioned?"
                                                )
                                            }
                                        >
                                            What technologies are mentioned?
                                        </button>
                                    </>

                                ) : (

                                    <>
                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "Explain Java inheritance with examples"
                                                )
                                            }
                                        >
                                            Explain Java inheritance
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "What is artificial intelligence?"
                                                )
                                            }
                                        >
                                            What is AI?
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleSuggestedQuestion(
                                                    "Give me some interesting project ideas"
                                                )
                                            }
                                        >
                                            Suggest project ideas
                                        </button>
                                    </>

                                )}

                            </div>

                        </div>

                    ) : (

                        /* MESSAGES */

                        <div className="messages">

                            {messages.map((message) => (

                                <div
                                    className={`message ${message.type}`}
                                    key={message.id}
                                >

                                    <div className="message-avatar">

                                        {message.type === "user"
                                            ? "S"
                                            : "◇"}

                                    </div>

                                    <div className="message-content">

                                        <span className="message-role">

                                            {message.type === "user"
                                                ? "YOU"
                                                : "DOCUMIND AI"}

                                        </span>

                                        <p
                                            className={
                                                message.error
                                                    ? "error-message"
                                                    : ""
                                            }
                                        >
                                            {message.content}
                                        </p>

                                        {/* SOURCES */}

                                        {message.sources?.length > 0 && (

                                            <div className="sources">

                                                <div className="sources-header">

                                                    <span className="sources-title">
                                                        SOURCES
                                                    </span>

                                                    <span className="sources-count">
                                                        {message.sources.length}
                                                    </span>

                                                </div>

                                                <div className="source-list">

                                                    {message.sources.map(
                                                        (source, index) => (

                                                            <SourceCard
                                                                key={
                                                                    source.id ||
                                                                    `${source.chunkIndex}-${index}`
                                                                }
                                                                source={source}
                                                                index={index}
                                                            />

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            ))}

                            {/* AI LOADING */}

                            {loading && (

                                <div className="message assistant">

                                    <div className="message-avatar">
                                        ◇
                                    </div>

                                    <div className="message-content">

                                        <span className="message-role">
                                            DOCUMIND AI
                                        </span>

                                        <p className="typing">
                                            {selectedDocument
                                                ? "Searching document context and generating an answer..."
                                                : "Thinking and generating an answer..."}
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}

                </div>

                {/* CHAT INPUT */}

                <div className="chat-input-wrapper">

                    <textarea
                        value={question}
                        onChange={(event) =>
                            setQuestion(event.target.value)
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
                        placeholder={
                            selectedDocument
                                ? "Ask a question about your document..."
                                : "Ask DocuMind anything..."
                        }
                        disabled={
                            loading ||
                            conversationLoading
                        }
                    />

                    <button
                        className="primary-btn send-btn"
                        onClick={sendQuestion}
                        disabled={
                            loading ||
                            conversationLoading ||
                            !question.trim()
                        }
                    >
                        {loading ? "..." : "→"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ChatPage;

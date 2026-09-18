import { useEffect, useState } from "react";

import {
    getDocuments,
    askQuestion,
} from "../services/api";

import SourceCard from "../components/SourceCard";

function ChatPage() {

    const [documents, setDocuments] =
        useState([]);

    const [selectedDocument, setSelectedDocument] =
        useState("");

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);


    /* -----------------------------------------------------
       LOAD DOCUMENTS
    ----------------------------------------------------- */

    useEffect(() => {

        getDocuments()

            .then((data) => {

                console.log(
                    "Chat documents received:",
                    data
                );

                setDocuments(
                    Array.isArray(data)
                        ? data
                        : []
                );

            })

            .catch((error) => {

                console.error(
                    "Failed to load chat documents:",
                    error
                );

                setDocuments([]);

            });

    }, []);


    /* -----------------------------------------------------
       SEND QUESTION
    ----------------------------------------------------- */

    const sendQuestion = async () => {

        if (!selectedDocument) {

            alert(
                "Please select a document first."
            );

            return;

        }


        if (
            !question.trim() ||
            loading
        ) {

            return;

        }


        const currentQuestion =
            question.trim();


        setMessages(
            (prev) => [
                ...prev,
                {
                    id:
                        crypto.randomUUID?.() ||
                        Date.now(),

                    type:
                        "user",

                    content:
                        currentQuestion,
                },
            ]
        );


        setQuestion("");

        setLoading(true);


        try {

            const response =
                await askQuestion(
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


            const sources =
                Array.isArray(
                    response?.sources
                )
                    ? response.sources
                    : [];


            setMessages(
                (prev) => [
                    ...prev,
                    {
                        id:
                            crypto.randomUUID?.() ||
                            Date.now(),

                        type:
                            "assistant",

                        content:
                            answer,

                        sources:
                            sources,
                    },
                ]
            );


            /* Save chat history */

            try {

                const existing =
                    JSON.parse(
                        localStorage.getItem(
                            "documind_history"
                        )
                    ) || [];


                const updated = [

                    {
                        question:
                            currentQuestion,

                        date:
                            new Date()
                                .toLocaleString(),
                    },

                    ...existing,

                ].slice(0, 50);


                localStorage.setItem(
                    "documind_history",
                    JSON.stringify(
                        updated
                    )
                );

            } catch (
                historyError
            ) {

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


            setMessages(
                (prev) => [
                    ...prev,
                    {
                        id:
                            crypto.randomUUID?.() ||
                            Date.now(),

                        type:
                            "assistant",

                        content:
                            backendError ||
                            "Something went wrong while generating the answer.",

                        sources: [],

                        error:
                            true,
                    },
                ]
            );

        } finally {

            setLoading(false);

        }

    };


    /* -----------------------------------------------------
       SUGGESTED QUESTION
    ----------------------------------------------------- */

    const handleSuggestedQuestion =
        (value) => {

            setQuestion(value);

        };


    return (

        <div className="chat-page">

            <div className="chat-main">


                {/* HEADER */}

                <div className="chat-header-section">

                    <div>

                        <div className="section-label">
                            DOCUMENT Q&A
                        </div>


                        <h1>
                            Ask your documents.
                        </h1>

                    </div>


                    <select
                        value={
                            selectedDocument
                        }
                        onChange={(event) =>
                            setSelectedDocument(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Select document
                        </option>


                        {documents.map(
                            (doc) => (

                                <option
                                    key={
                                        doc.id
                                    }
                                    value={
                                        doc.id
                                    }
                                >
                                    {
                                        doc.fileName
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* CHAT AREA */}

                <div className="chat-container">


                    {/* EMPTY CHAT */}

                    {messages.length === 0 ? (

                        <div className="chat-empty">

                            <div className="chat-empty-icon">
                                ◌
                            </div>


                            <h2>
                                Start a conversation
                            </h2>


                            <p>

                                Select a document and
                                ask a question about
                                its contents.

                            </p>


                            <div className="suggested-questions">

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

                            </div>

                        </div>

                    ) : (

                        /* MESSAGES */

                        <div className="messages">

                            {messages.map(
                                (message) => (

                                    <div
                                        className={`message ${
                                            message.type
                                        }`}
                                        key={
                                            message.id
                                        }
                                    >

                                        <div className="message-avatar">

                                            {message.type ===
                                            "user"
                                                ? "S"
                                                : "◇"}

                                        </div>


                                        <div className="message-content">

                                            <span className="message-role">

                                                {message.type ===
                                                "user"
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
                                                {
                                                    message.content
                                                }
                                            </p>


                                            {/* SOURCES */}

                                            {message.sources?.length > 0 && (

                                                <div className="sources">

                                                    <div className="sources-header">

                                                        <span className="sources-title">
                                                            SOURCES
                                                        </span>

                                                        <span className="sources-count">
                                                            {
                                                                message.sources.length
                                                            }
                                                        </span>

                                                    </div>


                                                    <div className="source-list">

                                                        {message.sources.map(
                                                            (
                                                                source,
                                                                index
                                                            ) => (

                                                                <SourceCard
                                                                    key={
                                                                        source.id ||
                                                                        `${source.chunkIndex}-${index}`
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

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                )
                            )}


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

                                            Searching document
                                            context and generating
                                            an answer...

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

                        value={
                            question
                        }

                        onChange={(event) =>
                            setQuestion(
                                event.target.value
                            )
                        }

                        onKeyDown={(event) => {

                            if (
                                event.key ===
                                    "Enter" &&
                                !event.shiftKey
                            ) {

                                event.preventDefault();

                                sendQuestion();

                            }

                        }}

                        placeholder="Ask a question about your document..."

                        disabled={
                            loading
                        }

                    />


                    <button

                        className="primary-btn send-btn"

                        onClick={
                            sendQuestion
                        }

                        disabled={
                            loading ||
                            !question.trim()
                        }

                    >

                        {loading
                            ? "..."
                            : "→"}

                    </button>

                </div>

            </div>

        </div>

    );
}

export default ChatPage;
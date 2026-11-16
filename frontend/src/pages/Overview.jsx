
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardStat from "../components/DashboardStat";
import QuickAction from "../components/QuickAction";
import {
    getDashboardStats,
    getDocuments
} from "../services/api";

function Overview() {
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [documentsLoading, setDocumentsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [statsData, documentsData] = await Promise.all([
                    getDashboardStats(),
                    getDocuments()
                ]);

                setStats(statsData);

                const sortedDocuments = [...documentsData].sort(
                    (a, b) =>
                        new Date(b.uploadedAt) - new Date(a.uploadedAt)
                );

                setDocuments(sortedDocuments.slice(0, 5));

            } catch (err) {
                console.error("Dashboard error:", err);
                setError("Unable to load dashboard data.");
            } finally {
                setLoading(false);
                setDocumentsLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatFileSize = (size) => {
        if (!size) return "—";

        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <div className="page-content">

            {/* Welcome Section */}
            <div className="welcome-row">
                <div>
                    <div className="section-label">
                        DASHBOARD
                    </div>

                    <h1>Welcome back.</h1>

                    <p>
                        Manage your documents
                        and ask questions with AI.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/app/documents")}
                >
                    + Upload Document
                </button>
            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            {/* Dashboard Statistics */}
            <div className="overview-stats">

                <DashboardStat
                    title="Documents"
                    value={loading ? "..." : stats?.totalDocuments ?? 0}
                    icon="▤"
                />

                <DashboardStat
                    title="Questions Asked"
                    value={loading ? "..." : stats?.totalQuestions ?? 0}
                    icon="◌"
                />

                <DashboardStat
                    title="Chunks Indexed"
                    value={loading ? "..." : stats?.totalChunks ?? 0}
                    icon="▦"
                />

                <DashboardStat
                    title="System Status"
                    value={loading ? "..." : stats?.systemStatus ?? "Unknown"}
                    icon="✓"
                    green={!loading && stats?.systemStatus === "ONLINE"}
                />

            </div>

            {/* Quick Start and System */}
            <div className="overview-grid">

                <div className="dashboard-card large-card">

                    <div className="card-header">
                        <div>
                            <span className="section-label">
                                QUICK START
                            </span>

                            <h3>
                                Ask your documents anything.
                            </h3>
                        </div>
                    </div>

                    <div className="quick-start">

                        <QuickAction
                            number="01"
                            title="Upload a document"
                            text="Add a PDF to your knowledge base."
                            to="/app/documents"
                        />

                        <QuickAction
                            number="02"
                            title="Ask a question"
                            text="Chat with your uploaded documents."
                            to="/app/chat"
                        />

                        <QuickAction
                            number="03"
                            title="Explore sources"
                            text="See where every answer came from."
                            to="/app/chat"
                        />

                    </div>
                </div>

                <div className="dashboard-card">

                    <div className="card-header">
                        <h3>System</h3>

                        <span className="green-status">
                            ● {loading
                                ? "Checking..."
                                : stats?.systemStatus ?? "Unknown"}
                        </span>
                    </div>

                    <div className="system-info">

                        <div>
                            <span>Backend</span>
                            <strong>Spring Boot</strong>
                        </div>

                        <div>
                            <span>Vector DB</span>
                            <strong>pgvector</strong>
                        </div>

                        <div>
                            <span>LLM</span>
                            <strong>Ollama</strong>
                        </div>

                        <div>
                            <span>Frontend</span>
                            <strong>React</strong>
                        </div>

                    </div>
                </div>

            </div>

            {/* Recent Documents */}
            <div className="dashboard-card recent-documents-card">

                <div className="card-header">
                    <div>
                        <span className="section-label">
                            YOUR LIBRARY
                        </span>

                        <h3>Recent Documents</h3>
                    </div>

                    <button
                        className="outline-btn small-btn"
                        onClick={() => navigate("/app/documents")}
                    >
                        View All →
                    </button>
                </div>

                {documentsLoading ? (

                    <div className="recent-empty">
                        Loading documents...
                    </div>

                ) : documents.length === 0 ? (

                    <div className="recent-empty">
                        <div className="empty-icon">▤</div>
                        <h3>No documents uploaded yet.</h3>
                        <p>Upload your first PDF to get started.</p>

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/app/documents")}
                        >
                            Upload Document
                        </button>
                    </div>

                ) : (

                    <div className="recent-documents-list">

                        {documents.map((doc) => (

                            <div
                                className="recent-document-row"
                                key={doc.id}
                            >

                                <div className="recent-file-icon">
                                    PDF
                                </div>

                                <div className="recent-document-info">
                                    <strong>
                                        {doc.fileName || "Untitled Document"}
                                    </strong>

                                    <small>
                                        Uploaded: {formatDate(doc.uploadedAt)}
                                    </small>
                                </div>

                                <div className="recent-document-size">
                                    {formatFileSize(doc.fileSize)}
                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Overview;

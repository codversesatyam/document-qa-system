import { useNavigate } from "react-router-dom";

import DashboardStat from "../components/DashboardStat";
import QuickAction from "../components/QuickAction";

function Overview() {
    const navigate = useNavigate();

    return (
        <div className="page-content">

            <div className="welcome-row">
                <div>
                    <div className="section-label">
                        DASHBOARD
                    </div>

                    <h1>
                        Welcome back.
                    </h1>

                    <p>
                        Manage your documents
                        and ask questions with AI.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate("/app/documents")
                    }
                >
                    + Upload Document
                </button>
            </div>

            <div className="overview-stats">

                <DashboardStat
                    title="Documents"
                    value="—"
                    icon="▤"
                />

                <DashboardStat
                    title="Questions Asked"
                    value="—"
                    icon="◌"
                />

                <DashboardStat
                    title="Chunks Indexed"
                    value="—"
                    icon="▦"
                />

                <DashboardStat
                    title="System Status"
                    value="Online"
                    icon="✓"
                    green
                />

            </div>

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

                        <h3>
                            System
                        </h3>

                        <span className="green-status">
                            ● Online
                        </span>

                    </div>

                    <div className="system-info">

                        <div>
                            <span>
                                Backend
                            </span>

                            <strong>
                                Spring Boot
                            </strong>
                        </div>

                        <div>
                            <span>
                                Vector DB
                            </span>

                            <strong>
                                pgvector
                            </strong>
                        </div>

                        <div>
                            <span>
                                LLM
                            </span>

                            <strong>
                                Ollama
                            </strong>
                        </div>

                        <div>
                            <span>
                                Frontend
                            </span>

                            <strong>
                                React
                            </strong>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Overview;
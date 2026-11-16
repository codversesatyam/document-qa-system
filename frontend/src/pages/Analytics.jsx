import { useEffect, useState } from "react";
import DashboardStat from "../components/DashboardStat";

function Analytics() {
    const [analytics, setAnalytics] = useState({
        documents: 0,
        storageBytes: 0,
        questions: 0,
        indexedChunks: 0,
        averageSources: 0,
        activity: {},
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem("documind_token");

                const response = await fetch(
                    "http://localhost:8080/api/analytics",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load analytics");
                }

                const data = await response.json();

                setAnalytics({
                    documents: data.documents ?? 0,
                    storageBytes: data.storageBytes ?? 0,
                    questions: data.questions ?? 0,
                    indexedChunks: data.indexedChunks ?? 0,
                    averageSources: data.averageSources ?? 0,
                    activity: data.activity ?? {},
                });
            } catch (err) {
                console.error("Analytics error:", err);
                setError("Unable to load analytics.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const formatStorage = (bytes) => {
        if (!bytes || bytes === 0) {
            return "0 B";
        }

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    const activityEntries = Object.entries(analytics.activity);

    const activityValues = activityEntries.map(
        ([, count]) => count
    );

    const maxActivity =
        Math.max(...activityValues, 1);

    const formatDate = (dateString) => {
        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <div className="page-content">

            {/* PAGE HEADING */}
            <div className="page-heading">
                <div>
                    <div className="section-label">
                        INSIGHTS
                    </div>

                    <h1>
                        Analytics.
                    </h1>

                    <p>
                        Understand how your document
                        knowledge base is being used.
                    </p>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="dashboard-card">
                    {error}
                </div>
            )}

            {/* STATISTICS */}
            <div className="overview-stats">

                <DashboardStat
                    title="Documents"
                    value={
                        loading
                            ? "..."
                            : analytics.documents
                    }
                    icon="▤"
                />

                <DashboardStat
                    title="Storage Used"
                    value={
                        loading
                            ? "..."
                            : formatStorage(
                                analytics.storageBytes
                            )
                    }
                    icon="◫"
                />

                <DashboardStat
                    title="Questions"
                    value={
                        loading
                            ? "..."
                            : analytics.questions
                    }
                    icon="◌"
                />

                <DashboardStat
                    title="Indexed Chunks"
                    value={
                        loading
                            ? "..."
                            : analytics.indexedChunks
                    }
                    icon="▦"
                />

            </div>

            {/* AVERAGE SOURCES */}
            <div
                className="dashboard-card"
                style={{
                    marginBottom: "24px",
                }}
            >
                <div className="card-header">
                    <div>
                        <span className="section-label">
                            RETRIEVAL
                        </span>

                        <h3>
                            Average sources per question
                        </h3>
                    </div>

                    <div
                        style={{
                            fontSize: "28px",
                            fontWeight: "600",
                        }}
                    >
                        {loading
                            ? "..."
                            : analytics.averageSources}
                    </div>
                </div>
            </div>

            {/* ACTIVITY CHART */}
            <div className="dashboard-card analytics-chart">

                <div className="card-header">

                    <div>
                        <span className="section-label">
                            ACTIVITY
                        </span>

                        <h3>
                            Questions over time
                        </h3>
                    </div>

                </div>

                {loading ? (
                    <div
                        style={{
                            padding: "40px 0",
                            textAlign: "center",
                        }}
                    >
                        Loading activity...
                    </div>
                ) : activityEntries.length === 0 ? (
                    <div
                        style={{
                            padding: "40px 0",
                            textAlign: "center",
                            opacity: 0.6,
                        }}
                    >
                        No question activity yet.
                    </div>
                ) : (
                    <div className="fake-chart">

                        {activityEntries.map(
                            ([date, count]) => {

                                const height =
                                    count === 0
                                        ? 2
                                        : Math.max(
                                            (count /
                                                maxActivity) *
                                                100,
                                            8
                                        );

                                return (
                                    <div
                                        key={date}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent:
                                                "flex-end",
                                            height: "100%",
                                            flex: 1,
                                        }}
                                    >

                                        <span
                                            style={{
                                                fontSize: "12px",
                                                marginBottom:
                                                    "8px",
                                                opacity: 0.7,
                                            }}
                                        >
                                            {count}
                                        </span>

                                        <div
                                            className="chart-bar"
                                            style={{
                                                height: `${height}%`,
                                                width: "60%",
                                                minHeight:
                                                    count === 0
                                                        ? "4px"
                                                        : undefined,
                                            }}
                                            title={`${count} question${count === 1
                                                ? ""
                                                : "s"
                                                } on ${formatDate(
                                                    date
                                                )}`}
                                        />

                                        <span
                                            style={{
                                                fontSize: "11px",
                                                marginTop:
                                                    "10px",
                                                opacity: 0.6,
                                            }}
                                        >
                                            {formatDate(
                                                date
                                            )}
                                        </span>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Analytics;
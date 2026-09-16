import DashboardStat from "../components/DashboardStat";

function Analytics() {
    return (
        <div className="page-content">

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

            <div className="overview-stats">

                <DashboardStat
                    title="Questions"
                    value="—"
                    icon="◌"
                />

                <DashboardStat
                    title="Documents"
                    value="—"
                    icon="▤"
                />

                <DashboardStat
                    title="Avg. Sources"
                    value="—"
                    icon="⌕"
                />

                <DashboardStat
                    title="Indexed Chunks"
                    value="—"
                    icon="▦"
                />

            </div>

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

                <div className="fake-chart">

                    {[
                        25,
                        40,
                        32,
                        65,
                        50,
                        80,
                        62,
                        90,
                        72,
                        100,
                    ].map(
                        (height, index) => (
                            <div
                                key={index}
                                className="chart-bar"
                                style={{
                                    height:
                                        `${height}%`,
                                }}
                            />
                        )
                    )}

                </div>

            </div>

        </div>
    );
}

export default Analytics;
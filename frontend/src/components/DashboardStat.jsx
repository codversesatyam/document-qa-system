function DashboardStat({
    title,
    value,
    icon,
    green,
}) {
    return (
        <div className="dashboard-stat">

            <span className="stat-icon">
                {icon}
            </span>

            <div>

                <small>
                    {title}
                </small>

                <strong
                    className={
                        green
                            ? "green-text"
                            : ""
                    }
                >
                    {value}
                </strong>

            </div>

        </div>
    );
}

export default DashboardStat;
function KnowledgeCard({
    label,
    title,
    text,
}) {
    return (
        <div className="dashboard-card">

            <span className="section-label">
                {label}
            </span>

            <h3>
                {title}
            </h3>

            <p>
                {text}
            </p>

            <div className="tech-status">

                <span>
                    ●
                </span>

                Ready

            </div>

        </div>
    );
}

export default KnowledgeCard;
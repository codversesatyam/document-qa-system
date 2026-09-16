function TechItem({
    icon,
    name,
}) {
    return (
        <div className="tech-item">

            <span className="tech-icon">
                {icon}
            </span>

            <span className="tech-name">
                {name}
            </span>

        </div>
    );
}


export default TechItem;
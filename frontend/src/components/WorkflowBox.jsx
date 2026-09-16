function WorkflowBox({
    icon,
    text,
    green = false,
}) {
    return (
        <div
            className={`workflow-box ${
                green
                    ? "workflow-box-green"
                    : ""
            }`}
        >

            <span className="workflow-icon">
                {icon}
            </span>

            <span className="workflow-text">
                {text}
            </span>

        </div>
    );
}


export function WorkflowArrow() {
    return (
        <div className="workflow-arrow">
            →
        </div>
    );
}


export default WorkflowBox;
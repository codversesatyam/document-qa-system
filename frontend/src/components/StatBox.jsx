function StatBox({
    value,
    text,
}) {
    return (
        <div className="stat-box">

            <strong>
                {value}
            </strong>

            <span>
                {text}
            </span>

        </div>
    );
}


export default StatBox;
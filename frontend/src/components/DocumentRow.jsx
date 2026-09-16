function DocumentRow({
    name,
    size,
    date,
}) {
    return (
        <div className="document-row">

            <span>
                {name}
            </span>

            <span>
                {size}
            </span>

            <span>
                {date}
            </span>

            <span>
                →
            </span>

        </div>
    );
}


export default DocumentRow;
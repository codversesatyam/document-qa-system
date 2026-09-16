import { useState } from "react";

function SourceCard({ source, index }) {
    const [open, setOpen] = useState(false);

    const chunkIndex = source?.chunkIndex;

    const content =
        source?.content ||
        source?.text ||
        source?.chunk ||
        "Relevant document chunk";

    return (
        <div
            className={`source-card ${
                open ? "source-card-open" : ""
            }`}
        >
            <button
                type="button"
                className="source-card-header"
                onClick={() => setOpen(!open)}
            >
                <div className="source-card-title">

                    <span className="source-number">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                        {chunkIndex !== undefined
                            ? `Chunk ${chunkIndex}`
                            : `Source ${index + 1}`}
                    </span>

                </div>

                <span className="source-toggle">
                    {open ? "−" : "+"}
                </span>

            </button>

            {open && (
                <div className="source-card-content">
                    {content}
                </div>
            )}
        </div>
    );
}

export default SourceCard;
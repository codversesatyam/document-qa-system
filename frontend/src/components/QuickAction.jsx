import { Link } from "react-router-dom";

function QuickAction({
    number,
    title,
    text,
    to,
}) {
    return (
        <Link
            to={to}
            className="quick-action"
        >
            <span>
                {number}
            </span>

            <div>
                <strong>
                    {title}
                </strong>

                <p>
                    {text}
                </p>
            </div>

            <b>
                →
            </b>
        </Link>
    );
}

export default QuickAction;
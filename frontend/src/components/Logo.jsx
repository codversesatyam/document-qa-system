import { Link } from "react-router-dom";


function Logo() {
    return (
        <Link to="/" className="brand">

            <div className="brand-icon">
                ▣
            </div>

            <span className="brand-name">
                Docu<span>Mind</span>
            </span>

        </Link>
    );
}


export default Logo;
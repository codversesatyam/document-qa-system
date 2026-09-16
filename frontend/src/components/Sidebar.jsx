import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Sidebar() {
    const location = useLocation();

    const items = [
        ["▣", "Overview", "/app"],
        ["▤", "Documents", "/app/documents"],
        ["◌", "AI Chat", "/app/chat"],
        ["◷", "History", "/app/history"],
        ["▥", "Analytics", "/app/analytics"],
        ["◈", "Knowledge Base", "/app/knowledge"],
    ];

    return (
        <aside className="workspace-sidebar">
            <Logo />

            <div className="sidebar-section-label">
                WORKSPACE
            </div>

            <nav>
                {items.map(([icon, label, path]) => (
                    <Link
                        key={path}
                        to={path}
                        className={`sidebar-link ${
                            location.pathname === path
                                ? "active"
                                : ""
                        }`}
                    >
                        <span>{icon}</span>
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <Link
                    to="/app/settings"
                    className={`sidebar-link ${
                        location.pathname === "/app/settings"
                            ? "active"
                            : ""
                    }`}
                >
                    <span>⚙</span>
                    Settings
                </Link>

                <div className="sidebar-user">
                    <div className="avatar">
                        S
                    </div>

                    <div>
                        <strong>
                            Satyam
                        </strong>

                        <small>
                            Developer
                        </small>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
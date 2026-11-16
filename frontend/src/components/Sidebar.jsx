
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { getCurrentUser } from "../services/api";

function Sidebar() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (error) {
                console.error("Failed to load user profile:", error);
            }
        };

        fetchUser();
    }, []);

    const items = [
        ["▣", "Overview", "/app"],
        ["▤", "Documents", "/app/documents"],
        ["◌", "AI Chat", "/app/chat"],
        ["◷", "History", "/app/history"],
        ["▥", "Analytics", "/app/analytics"],
        ["◈", "Knowledge Base", "/app/knowledge"],
    ];

    const initial = user?.name?.charAt(0).toUpperCase() || "U";

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
                            location.pathname === path ? "active" : ""
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
                        location.pathname === "/app/settings" ? "active" : ""
                    }`}
                >
                    <span>⚙</span>
                    Settings
                </Link>

                <div className="sidebar-user">
                    <div className="avatar">
                        {initial}
                    </div>

                    <div>
                        <strong>
                            {user?.name || "Loading..."}
                        </strong>

                        <small>
                            Workspace Member
                        </small>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

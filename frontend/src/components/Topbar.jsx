import { useLocation } from "react-router-dom";

function Topbar() {
    const location = useLocation();

    const titles = {
        "/app": "Overview",
        "/app/documents": "Documents",
        "/app/chat": "AI Chat",
        "/app/history": "Chat History",
        "/app/analytics": "Analytics",
        "/app/knowledge": "Knowledge Base",
        "/app/settings": "Settings",
    };

    return (
        <header className="workspace-topbar">
            <div>
                <span className="topbar-label">
                    WORKSPACE
                </span>

                <h2>
                    {titles[location.pathname] || "Workspace"}
                </h2>
            </div>

            <div className="topbar-actions">
                <button className="icon-btn">
                    ?
                </button>

                <button className="icon-btn">
                    ◔
                </button>

                <div className="topbar-avatar">
                    S
                </div>
            </div>
        </header>
    );
}

export default Topbar;
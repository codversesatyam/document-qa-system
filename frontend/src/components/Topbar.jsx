import { useLocation, useNavigate } from "react-router-dom";

function Topbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const titles = {
        "/app": "Overview",
        "/app/documents": "Documents",
        "/app/chat": "AI Chat",
        "/app/history": "Chat History",
        "/app/analytics": "Analytics",
        "/app/knowledge": "Knowledge Base",
        "/app/settings": "Settings",
    };

    const handleLogout = () => {
        console.log("Logging out...");

        localStorage.removeItem("documind_token");

        navigate("/login", { replace: true });
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

                <button
                    type="button"
                    className="icon-btn"
                >
                    ?
                </button>

                <button
                    type="button"
                    className="icon-btn"
                >
                    ◔
                </button>

                <button
                    type="button"
                    className="topbar-avatar"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                >
                    S
                </button>

            </div>
        </header>
    );
}

export default Topbar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";

function Settings() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("documind_token");
        navigate("/login", { replace: true });
    };

    return (
        <div className="page-content">

            {/* Page Heading */}
            <div className="page-heading">
                <div>
                    <div className="section-label">
                        CONFIGURATION
                    </div>

                    <h1>Settings.</h1>

                    <p>
                        Manage your DocuMind workspace.
                    </p>
                </div>
            </div>

            <div className="settings-grid">

                {/* Profile Card */}
                <div className="dashboard-card">
                    <h3>Profile</h3>

                    <div className="setting-row">
                        <span>Name</span>
                        <strong>
                            {loading
                                ? "Loading..."
                                : user?.name || "Unavailable"}
                        </strong>
                    </div>

                    <div className="setting-row">
                        <span>Email</span>
                        <strong>
                            {loading
                                ? "Loading..."
                                : user?.email || "Unavailable"}
                        </strong>
                    </div>

                    <div className="setting-row">
                        <span>User ID</span>
                        <strong>
                            {loading
                                ? "Loading..."
                                : user?.id ?? "Unavailable"}
                        </strong>
                    </div>
                </div>

                {/* System Card */}
                <div className="dashboard-card">
                    <h3>System</h3>

                    <div className="setting-row">
                        <span>API</span>
                        <strong>localhost:8080</strong>
                    </div>

                    <div className="setting-row">
                        <span>LLM</span>
                        <strong>Ollama / Llama 3.2</strong>
                    </div>

                    <div className="setting-row">
                        <span>Vector DB</span>
                        <strong>pgvector</strong>
                    </div>
                </div>

                {/* Account Security Card */}
                <div className="dashboard-card">
                    <h3>Account Security</h3>

                    <div className="setting-row">
                        <span>Authentication</span>
                        <strong className="status-online">
                            Active
                        </strong>
                    </div>

                    <div className="setting-row">
                        <span>Login Method</span>
                        <strong>JWT Authentication</strong>
                    </div>
                </div>

                {/* Session Card */}
                <div className="dashboard-card">
                    <h3>Session</h3>

                    <p>
                        Sign out of your DocuMind account
                        on this device.
                    </p>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Settings;


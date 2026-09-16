function Settings() {
    return (
        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        CONFIGURATION
                    </div>

                    <h1>
                        Settings.
                    </h1>

                    <p>
                        Manage your DocuMind workspace.
                    </p>

                </div>

            </div>

            <div className="settings-grid">

                <div className="dashboard-card">

                    <h3>
                        Profile
                    </h3>

                    <div className="setting-row">

                        <span>
                            Name
                        </span>

                        <strong>
                            Satyam
                        </strong>

                    </div>

                    <div className="setting-row">

                        <span>
                            Role
                        </span>

                        <strong>
                            Developer
                        </strong>

                    </div>

                </div>

                <div className="dashboard-card">

                    <h3>
                        System
                    </h3>

                    <div className="setting-row">

                        <span>
                            API
                        </span>

                        <strong>
                            localhost:8080
                        </strong>

                    </div>

                    <div className="setting-row">

                        <span>
                            LLM
                        </span>

                        <strong>
                            Ollama / Llama 3.2
                        </strong>

                    </div>

                    <div className="setting-row">

                        <span>
                            Vector DB
                        </span>

                        <strong>
                            pgvector
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Settings;
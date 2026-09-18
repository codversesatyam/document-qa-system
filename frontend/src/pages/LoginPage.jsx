import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const token = response.data.token;

            // Store JWT for future authenticated API requests
            localStorage.setItem("documind_token", token);

            // Go to protected workspace
            navigate("/app");
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.data) {
                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Invalid email or password."
                );
            } else {
                setError("Unable to connect to the server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-label">
                WELCOME BACK
            </div>

            <h1>
                Sign in to DocuMind
            </h1>

            <p className="auth-description">
                Access your documents and
                continue your conversations.
            </p>

            <form onSubmit={handleLogin}>
                <label>
                    Email
                </label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label>
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    className="primary-btn auth-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Sign In →"}
                </button>
            </form>

            <p className="auth-switch">
                Don't have an account?

                <Link to="/signup">
                    {" "}Create one
                </Link>
            </p>
        </AuthLayout>
    );
}

export default LoginPage;
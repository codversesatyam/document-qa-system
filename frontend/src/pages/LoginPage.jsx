import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        /*
         * UI-only for now.
         *
         * Later we will connect this to
         * Spring Security + JWT.
         */

        navigate("/app");
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
                    required
                />

                <label>
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    required
                />

                <button
                    className="primary-btn auth-btn"
                    type="submit"
                >
                    Sign In →
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
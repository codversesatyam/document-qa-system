import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function SignupPage() {
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();

        /*
         * UI-only for now.
         *
         * Later we will connect this to
         * Spring Security registration.
         */

        navigate("/app");
    };

    return (
        <AuthLayout>

            <div className="auth-label">
                GET STARTED
            </div>

            <h1>
                Create your account
            </h1>

            <p className="auth-description">
                Start turning your documents
                into knowledge.
            </p>

            <form onSubmit={handleSignup}>

                <label>
                    Name
                </label>

                <input
                    type="text"
                    placeholder="Your name"
                    required
                />

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
                    Create Account →
                </button>

            </form>

            <p className="auth-switch">
                Already have an account?

                <Link to="/login">
                    {" "}Sign in
                </Link>
            </p>

        </AuthLayout>
    );
}

export default SignupPage;
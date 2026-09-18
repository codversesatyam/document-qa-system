import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function SignupPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setSuccess("Account created successfully! Redirecting to login...");

            // Give the user a moment to see the success message
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error("Signup failed:", error);

            if (error.response?.data) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to create account."
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
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    required
                />

                <label>
                    Email
                </label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                />

                <label>
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="auth-success">
                        {success}
                    </p>
                )}

                <button
                    className="primary-btn auth-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account →"}
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
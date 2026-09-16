import Logo from "./Logo";

function AuthLayout({ children }) {
    return (
        <div className="auth-page">

            <div className="auth-left">

                <Logo />

                <div className="auth-brand-content">

                    <div className="section-label">
                        DOCUMENT INTELLIGENCE
                    </div>

                    <h2>
                        Your documents.
                        <br />
                        Your knowledge.
                    </h2>

                    <p>
                        Ask questions, find answers,
                        and understand your documents
                        using RAG.
                    </p>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-card">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AuthLayout;
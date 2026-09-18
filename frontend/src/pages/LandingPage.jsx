import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import HeroPoint from "../components/HeroPoint";
import TechItem from "../components/TechItem";
import WorkflowBox, {
    WorkflowArrow,
} from "../components/WorkflowBox";
import FeatureCard from "../components/FeatureCard";
import DocumentRow from "../components/DocumentRow";
import StatBox from "../components/StatBox";


function LandingPage() {

    const navigate = useNavigate();

    // Check whether the user is already logged in
    const handleGetStarted = () => {
        const token = localStorage.getItem("documind_token");

        if (token) {
            navigate("/app");
        } else {
            navigate("/login");
        }
    };

    const scrollTo = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };


    return (

        <div className="marketing-page">

            {/* NAVBAR */}

            <header className="landing-nav">

                <Logo />

                <nav className="landing-links">

                    <button
                        onClick={() =>
                            scrollTo("home")
                        }
                    >
                        Home
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("features")
                        }
                    >
                        Features
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("workflow")
                        }
                    >
                        How it works
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("tech-stack")
                        }
                    >
                        Tech Stack
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("about")
                        }
                    >
                        About
                    </button>

                </nav>


                <div className="nav-actions">

                    <button
                        className="outline-btn small-btn"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Sign in
                    </button>


                    <button
                        className="primary-btn small-btn"
                        onClick={handleGetStarted}
                    >
                        Get Started →
                    </button>

                </div>

            </header>


            {/* HERO */}

            <section
                className="hero-section"
                id="home"
            >

                <div className="hero-grid">

                    <div className="hero-content">

                        <div className="eyebrow">

                            <span className="status-dot" />

                            YOUR DOCUMENTS.
                            MORE INTELLIGENCE.

                        </div>


                        <h1>

                            Turn documents
                            <br />

                            into{" "}

                            <span>
                                knowledge.
                            </span>

                        </h1>


                        <p className="hero-description">

                            Upload PDFs, ask questions in
                            natural language, and get accurate,
                            source-backed answers using
                            Retrieval-Augmented Generation.

                        </p>


                        <div className="hero-buttons">

                            <button
                                className="primary-btn large-btn"
                                onClick={handleGetStarted}
                            >
                                Get Started →
                            </button>


                            <button
                                className="outline-btn large-btn"
                                onClick={() =>
                                    scrollTo("workflow")
                                }
                            >
                                Watch Demo ▷
                            </button>

                        </div>


                        <div className="hero-points">

                            <HeroPoint
                                icon="◈"
                                title="Secure & Private"
                                text="Your data stays yours"
                            />

                            <HeroPoint
                                icon="⌁"
                                title="Powered by RAG"
                                text="Grounded answers"
                            />

                            <HeroPoint
                                icon="⌘"
                                title="Built for Developers"
                                text="Modern stack"
                            />

                        </div>

                    </div>


                    {/* PRODUCT PREVIEW */}

                    <div className="hero-preview">

                        <div className="browser-window">

                            <div className="browser-header">

                                <div className="window-dots">

                                    <span />
                                    <span />
                                    <span />

                                </div>

                                <span className="browser-title">
                                    DocuMind
                                </span>

                            </div>


                            <div className="preview-body">

                                <div className="preview-sidebar">

                                    <div className="preview-logo">
                                        <span>▣</span>{" "}
                                        DocuMind
                                    </div>


                                    {[
                                        "◉ Overview",
                                        "▤ Documents",
                                        "◌ AI Chat",
                                        "◷ History",
                                        "◫ Analytics",
                                        "◈ Knowledge Base",
                                        "⚙ Settings",
                                    ].map(
                                        (item, index) => (

                                            <div
                                                key={item}
                                                className={`preview-nav ${
                                                    index === 0
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                {item}
                                            </div>

                                        )
                                    )}

                                </div>


                                <div className="preview-chat">

                                    <div className="preview-chat-header">

                                        <strong>
                                            Chat with your documents
                                        </strong>

                                        <span className="online-indicator">
                                            ●
                                        </span>

                                    </div>


                                    <div className="chat-question">

                                        What are the key technologies
                                        mentioned in this resume?

                                    </div>


                                    <div className="chat-answer">

                                        <strong>
                                            The document mentions:
                                        </strong>


                                        <ul>

                                            <li>Java</li>
                                            <li>Spring Boot</li>
                                            <li>React.js</li>
                                            <li>PostgreSQL</li>
                                            <li>Docker</li>
                                            <li>System Design</li>

                                        </ul>


                                        <div className="source-tags">

                                            <span>
                                                Page 1
                                            </span>

                                            <span>
                                                Page 2
                                            </span>

                                        </div>

                                    </div>


                                    <div className="preview-input">

                                        <span>
                                            Ask another question...
                                        </span>

                                        <button>
                                            →
                                        </button>

                                    </div>

                                </div>


                                <div className="preview-document">

                                    <div className="pdf-label">
                                        PDF
                                    </div>

                                    <strong>
                                        Resume.pdf
                                    </strong>

                                    <small>
                                        2.4 MB · 2 pages
                                    </small>


                                    <div className="fake-pdf">

                                        {[1, 2, 3, 4, 5, 6].map(
                                            (x) => (
                                                <div key={x} />
                                            )
                                        )}

                                    </div>


                                    <small>
                                        Page 1
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* TECH STACK */}

            <section
                className="tech-section"
                id="tech-stack"
            >

                <div className="section-container">

                    <div className="section-label">
                        TRUSTED TECHNOLOGIES
                    </div>

                    <h2>
                        Built with modern,
                        reliable tools.
                    </h2>


                    <div className="tech-grid">

                        <TechItem
                            icon="☕"
                            name="Java"
                        />

                        <TechItem
                            icon="◉"
                            name="Spring Boot"
                        />

                        <TechItem
                            icon="⚛"
                            name="React"
                        />

                        <TechItem
                            icon="🐘"
                            name="PostgreSQL"
                        />

                        <TechItem
                            icon="◇"
                            name="pgvector"
                        />

                        <TechItem
                            icon="◈"
                            name="Ollama"
                        />


                        <div className="tech-description">

                            Open source.
                            <br />

                            Real world.
                            <br />

                            Production ready.

                        </div>

                    </div>

                </div>

            </section>


            {/* RAG WORKFLOW */}

            <section
                className="workflow-section"
                id="workflow"
            >

                <div className="section-container">

                    <div className="workflow-layout">

                        <div className="workflow-content">

                            <div className="section-label">
                                HOW DOCUMIND WORKS
                            </div>


                            <h2>

                                From PDF to answers,
                                <br />

                                with real context.

                            </h2>


                            <p>

                                DocuMind uses
                                Retrieval-Augmented Generation
                                to give you accurate,
                                source-backed responses
                                from your documents.

                            </p>


                            <button
                                className="outline-btn"
                                onClick={handleGetStarted}
                            >
                                Explore the workflow →
                            </button>

                        </div>


                        <div className="rag-workflow">

                            <WorkflowBox
                                icon="□"
                                text="Upload PDF"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="≡"
                                text="Extract Text"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="▦"
                                text="Chunk Content"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="◫"
                                text="Generate Embeddings"
                            />


                            <div className="workflow-break" />


                            <WorkflowBox
                                icon="▣"
                                text="Store in pgvector"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="⌕"
                                text="Semantic Retrieval"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="◈"
                                text="LLM (Ollama)"
                            />

                            <WorkflowArrow />

                            <WorkflowBox
                                icon="✓"
                                text="Grounded Answer"
                                green
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section
                className="features-section"
                id="features"
            >

                <div className="section-container">

                    <div className="section-label">
                        FEATURES
                    </div>


                    <div className="section-heading-row">

                        <h2>

                            Everything you need for
                            <br />

                            document intelligence.

                        </h2>


                        <p>
                            A focused set of features,
                            built for productivity.
                        </p>

                    </div>


                    <div className="feature-grid">

                        <FeatureCard
                            icon="▱"
                            title="AI-Powered Chat"
                            text="Ask questions and get context-aware answers from your documents."
                        />

                        <FeatureCard
                            icon="▤"
                            title="PDF Management"
                            text="Upload, view, and manage your documents with ease."
                        />

                        <FeatureCard
                            icon="▥"
                            title="Insights & Analytics"
                            text="See how you use your documents and what matters most."
                        />

                        <FeatureCard
                            icon="◇"
                            title="Private & Secure"
                            text="Your data stays in your environment. No unnecessary data sharing."
                        />

                    </div>

                </div>

            </section>


            {/* PRODUCT PREVIEW */}

            <section className="product-section">

                <div className="section-container">

                    <div className="product-layout">

                        <div className="product-content">

                            <div className="section-label">
                                PRODUCT PREVIEW
                            </div>


                            <h2>

                                A clean, focused
                                <br />

                                workspace.

                            </h2>


                            <p>
                                Simple. Fast.
                                Designed for deep work.
                            </p>


                            <div className="check-list">

                                <div>
                                    ✓ Organize your documents
                                </div>

                                <div>
                                    ✓ Chat with specific files
                                </div>

                                <div>
                                    ✓ View source chunks
                                </div>

                                <div>
                                    ✓ Track usage and insights
                                </div>

                            </div>


                            <button
                                className="primary-btn"
                                onClick={handleGetStarted}
                            >
                                Try DocuMind →
                            </button>

                        </div>


                        <div className="dashboard-preview">

                            <div className="dashboard-top">

                                <strong>
                                    Documents
                                </strong>

                                <button className="primary-btn tiny-btn">
                                    + Upload Document
                                </button>

                            </div>


                            <div className="dashboard-search">
                                ⌕ Search documents...
                            </div>


                            <div className="document-table">

                                <div className="table-head">

                                    <span>
                                        NAME
                                    </span>

                                    <span>
                                        SIZE
                                    </span>

                                    <span>
                                        UPLOADED
                                    </span>

                                    <span>
                                        ACTIONS
                                    </span>

                                </div>


                                <DocumentRow
                                    name="Resume.pdf"
                                    size="2.4 MB"
                                    date="Sep 15, 2026"
                                />

                                <DocumentRow
                                    name="Project_Report.pdf"
                                    size="1.8 MB"
                                    date="Sep 14, 2026"
                                />

                                <DocumentRow
                                    name="Research_Paper.pdf"
                                    size="3.1 MB"
                                    date="Sep 12, 2026"
                                />

                                <DocumentRow
                                    name="System_Design.pdf"
                                    size="2.7 MB"
                                    date="Sep 10, 2026"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* NUMBERS */}

            <section className="numbers-section">

                <div className="section-container">

                    <div className="numbers-layout">

                        <div>

                            <div className="section-label">
                                BY THE NUMBERS
                            </div>

                            <h2>

                                Small project.
                                <br />

                                Big possibilities.

                            </h2>

                        </div>


                        <StatBox
                            value="RAG"
                            text="Grounded Answers"
                        />

                        <StatBox
                            value="pgvector"
                            text="Semantic Search"
                        />

                        <StatBox
                            value="Java"
                            text="Backend Powered"
                        />

                        <StatBox
                            value="Local"
                            text="AI Processing"
                        />

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section
                className="cta-section"
                id="about"
            >

                <div className="cta-grid">

                    <div>

                        <div className="section-label">
                            READY TO EXPLORE?
                        </div>


                        <h2>

                            Start building with
                            <br />

                            DocuMind today.

                        </h2>


                        <p>

                            Turn your documents into
                            a living, searchable
                            knowledge base.

                        </p>


                        <div className="hero-buttons">

                            <button
                                className="primary-btn"
                                onClick={handleGetStarted}
                            >
                                Get Started →
                            </button>


                            <button className="outline-btn">
                                View on GitHub ◉
                            </button>

                        </div>

                    </div>


                    <div className="cta-quote">

                        "Knowledge isn't power
                        <br />

                        until you can find it."

                        <div />

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="landing-footer">

                <div>

                    <Logo />

                    <p>
                        Built with ♥ for developers,
                        by a developer.
                    </p>

                </div>


                <div className="footer-links">

                    <button
                        onClick={() =>
                            scrollTo("home")
                        }
                    >
                        Home
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("features")
                        }
                    >
                        Features
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("workflow")
                        }
                    >
                        How it works
                    </button>

                    <button
                        onClick={() =>
                            scrollTo("tech-stack")
                        }
                    >
                        Tech Stack
                    </button>

                </div>


                <div className="footer-social">
                    ◉ &nbsp; in &nbsp; 𝕏 &nbsp; ✉
                </div>


                <div className="footer-bottom">

                    © 2026 DocuMind.
                    All rights reserved.

                </div>

            </footer>

        </div>
    );
}

export default LandingPage;
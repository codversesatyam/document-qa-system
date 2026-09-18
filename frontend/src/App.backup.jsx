import { useEffect, useMemo, useState } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    getDocuments,
    uploadDocument,
    deleteDocument,
    askQuestion,
} from "./services/api";

import "./App.css";


/* =========================================================
   BRAND
========================================================= */

function Logo() {
    return (
        <Link to="/" className="brand">
            <div className="brand-icon">▣</div>

            <span className="brand-name">
                Docu<span>Mind</span>
            </span>
        </Link>
    );
}


/* =========================================================
   LANDING PAGE
========================================================= */

function LandingPage() {

    const navigate = useNavigate();

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
                        onClick={() =>
                            navigate("/app")
                        }
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
                                onClick={() =>
                                    navigate("/app")
                                }
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
                                onClick={() =>
                                    navigate("/app")
                                }
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
                                onClick={() =>
                                    navigate("/app")
                                }
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
                                onClick={() =>
                                    navigate("/app")
                                }
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


/* =========================================================
   LANDING PAGE HELPER COMPONENTS
========================================================= */

function HeroPoint({
    icon,
    title,
    text,
}) {

    return (

        <div>

            <span>
                {icon}
            </span>

            <div>

                <strong>
                    {title}
                </strong>

                <small>
                    {text}
                </small>

            </div>

        </div>

    );
}


function TechItem({
    icon,
    name,
}) {

    return (

        <div className="tech-item">

            <span>
                {icon}
            </span>

            <strong>
                {name}
            </strong>

        </div>

    );
}


function WorkflowBox({
    icon,
    text,
    green,
}) {

    return (

        <div
            className={`workflow-box ${
                green
                    ? "workflow-green"
                    : ""
            }`}
        >

            <span>
                {icon}
            </span>

            <small>
                {text}
            </small>

        </div>

    );
}


function WorkflowArrow() {

    return (
        <div className="workflow-arrow">
            →
        </div>
    );

}


function FeatureCard({
    icon,
    title,
    text,
}) {

    return (

        <div className="feature-card">

            <div className="feature-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {text}
            </p>

        </div>

    );
}


function DocumentRow({
    name,
    size,
    date,
}) {

    return (

        <div className="document-row">

            <span className="file-name">

                <b>
                    PDF
                </b>

                {name}

            </span>

            <span>
                {size}
            </span>

            <span>
                {date}
            </span>

            <span>
                ⋮
            </span>

        </div>

    );
}


function StatBox({
    value,
    text,
}) {

    return (

        <div className="stat-box">

            <strong>
                {value}
            </strong>

            <span>
                {text}
            </span>

        </div>

    );

}


/* =========================================================
   AUTH - LOGIN
========================================================= */

function Login() {

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


/* =========================================================
   AUTH - SIGNUP
========================================================= */

function Signup() {

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


/* =========================================================
   AUTH LAYOUT
========================================================= */

function AuthLayout({
    children,
}) {

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


/* =========================================================
   WORKSPACE
========================================================= */

function Workspace() {

    return (

        <div className="workspace">

            <Sidebar />


            <main className="workspace-main">

                <Topbar />


                <Routes>

                    <Route
                        path="/"
                        element={<Overview />}
                    />

                    <Route
                        path="/documents"
                        element={<Documents />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                    <Route
                        path="/history"
                        element={<History />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/knowledge"
                        element={<KnowledgeBase />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Routes>

            </main>

        </div>

    );
}


/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {

    const location = useLocation();

    const items = [

        [
            "▣",
            "Overview",
            "/app",
        ],

        [
            "▤",
            "Documents",
            "/app/documents",
        ],

        [
            "◌",
            "AI Chat",
            "/app/chat",
        ],

        [
            "◷",
            "History",
            "/app/history",
        ],

        [
            "▥",
            "Analytics",
            "/app/analytics",
        ],

        [
            "◈",
            "Knowledge Base",
            "/app/knowledge",
        ],

    ];


    return (

        <aside className="workspace-sidebar">

            <Logo />


            <div className="sidebar-section-label">
                WORKSPACE
            </div>


            <nav>

                {items.map(
                    ([
                        icon,
                        label,
                        path,
                    ]) => (

                        <Link
                            key={path}
                            to={path}
                            className={`sidebar-link ${
                                location.pathname === path
                                    ? "active"
                                    : ""
                            }`}
                        >

                            <span>
                                {icon}
                            </span>

                            {label}

                        </Link>

                    )
                )}

            </nav>


            <div className="sidebar-bottom">

                <Link
                    to="/app/settings"
                    className={`sidebar-link ${
                        location.pathname ===
                        "/app/settings"
                            ? "active"
                            : ""
                    }`}
                >

                    <span>
                        ⚙
                    </span>

                    Settings

                </Link>


                <div className="sidebar-user">

                    <div className="avatar">
                        S
                    </div>


                    <div>

                        <strong>
                            Satyam
                        </strong>

                        <small>
                            Developer
                        </small>

                    </div>

                </div>

            </div>

        </aside>

    );
}


/* =========================================================
   TOPBAR
========================================================= */

function Topbar() {

    const location = useLocation();


    const titles = {

        "/app":
            "Overview",

        "/app/documents":
            "Documents",

        "/app/chat":
            "AI Chat",

        "/app/history":
            "Chat History",

        "/app/analytics":
            "Analytics",

        "/app/knowledge":
            "Knowledge Base",

        "/app/settings":
            "Settings",

    };


    return (

        <header className="workspace-topbar">

            <div>

                <span className="topbar-label">
                    WORKSPACE
                </span>


                <h2>
                    {titles[
                        location.pathname
                    ] || "Workspace"}
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


/* =========================================================
   OVERVIEW
========================================================= */

function Overview() {

    const navigate = useNavigate();


    return (

        <div className="page-content">

            <div className="welcome-row">

                <div>

                    <div className="section-label">
                        DASHBOARD
                    </div>


                    <h1>
                        Welcome back.
                    </h1>


                    <p>
                        Manage your documents
                        and ask questions with AI.
                    </p>

                </div>


                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate(
                            "/app/documents"
                        )
                    }
                >
                    + Upload Document
                </button>

            </div>


            <div className="overview-stats">

                <DashboardStat
                    title="Documents"
                    value="—"
                    icon="▤"
                />

                <DashboardStat
                    title="Questions Asked"
                    value="—"
                    icon="◌"
                />

                <DashboardStat
                    title="Chunks Indexed"
                    value="—"
                    icon="▦"
                />

                <DashboardStat
                    title="System Status"
                    value="Online"
                    icon="✓"
                    green
                />

            </div>


            <div className="overview-grid">

                <div className="dashboard-card large-card">

                    <div className="card-header">

                        <div>

                            <span className="section-label">
                                QUICK START
                            </span>

                            <h3>
                                Ask your documents anything.
                            </h3>

                        </div>

                    </div>


                    <div className="quick-start">

                        <QuickAction
                            number="01"
                            title="Upload a document"
                            text="Add a PDF to your knowledge base."
                            to="/app/documents"
                        />

                        <QuickAction
                            number="02"
                            title="Ask a question"
                            text="Chat with your uploaded documents."
                            to="/app/chat"
                        />

                        <QuickAction
                            number="03"
                            title="Explore sources"
                            text="See where every answer came from."
                            to="/app/chat"
                        />

                    </div>

                </div>


                <div className="dashboard-card">

                    <div className="card-header">

                        <h3>
                            System
                        </h3>

                        <span className="green-status">
                            ● Online
                        </span>

                    </div>


                    <div className="system-info">

                        <div>
                            <span>
                                Backend
                            </span>

                            <strong>
                                Spring Boot
                            </strong>
                        </div>


                        <div>
                            <span>
                                Vector DB
                            </span>

                            <strong>
                                pgvector
                            </strong>
                        </div>


                        <div>
                            <span>
                                LLM
                            </span>

                            <strong>
                                Ollama
                            </strong>
                        </div>


                        <div>
                            <span>
                                Frontend
                            </span>

                            <strong>
                                React
                            </strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}


function DashboardStat({
    title,
    value,
    icon,
    green,
}) {

    return (

        <div className="dashboard-stat">

            <span className="stat-icon">
                {icon}
            </span>


            <div>

                <small>
                    {title}
                </small>

                <strong
                    className={
                        green
                            ? "green-text"
                            : ""
                    }
                >
                    {value}
                </strong>

            </div>

        </div>

    );
}


function QuickAction({
    number,
    title,
    text,
    to,
}) {

    return (

        <Link
            to={to}
            className="quick-action"
        >

            <span>
                {number}
            </span>


            <div>

                <strong>
                    {title}
                </strong>

                <p>
                    {text}
                </p>

            </div>


            <b>
                →
            </b>

        </Link>

    );
}


/* =========================================================
   DOCUMENTS
   IMPORTANT CHANGE:
   Backend returns:
   {
       success: true,
       data: [...]
   }

   api.js now unwraps data.
========================================================= */

function Documents() {

    const [documents, setDocuments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    const [search, setSearch] =
        useState("");


    /* -----------------------------------------------------
       LOAD DOCUMENTS
    ----------------------------------------------------- */

    const loadDocuments = async () => {

        try {

            const data =
                await getDocuments();


            console.log(
                "Documents received by component:",
                data
            );


            setDocuments(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load documents:",
                error
            );


            setDocuments([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadDocuments();

    }, []);


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    const filteredDocuments =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {

                return documents;

            }


            return documents.filter(
                (doc) =>

                    String(
                        doc?.fileName || ""
                    )
                        .toLowerCase()
                        .includes(query)
            );

        }, [
            documents,
            search,
        ]);


    /* -----------------------------------------------------
       UPLOAD DOCUMENT
    ----------------------------------------------------- */

    const handleUpload = async (
        event
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {

            return;

        }


        /* PDF validation */

        if (
            file.type !==
            "application/pdf"
        ) {

            alert(
                "Please select a PDF file."
            );


            event.target.value = "";

            return;

        }


        /* 10 MB validation */

        if (
            file.size >
            10 * 1024 * 1024
        ) {

            alert(
                "PDF must be smaller than 10 MB."
            );


            event.target.value = "";

            return;

        }


        try {

            setUploading(true);


            console.log(
                "Uploading:",
                file.name
            );


            await uploadDocument(
                file
            );


            console.log(
                "Upload successful"
            );


            /*
             * Reload documents after
             * successful upload.
             */

            await loadDocuments();

        } catch (error) {

            console.error(
                "Upload failed:",
                error
            );


            alert(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to upload document."
            );

        } finally {

            setUploading(false);


            /*
             * Allows the same file to
             * be selected again.
             */

            event.target.value = "";

        }

    };


    /* -----------------------------------------------------
       DELETE DOCUMENT
    ----------------------------------------------------- */

    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this document?"
                )
            ) {

                return;

            }


            try {

                await deleteDocument(
                    id
                );


                setDocuments(
                    (prev) =>
                        prev.filter(
                            (doc) =>
                                doc.id !== id
                        )
                );

            } catch (error) {

                console.error(
                    "Delete failed:",
                    error
                );


                alert(
                    "Failed to delete document."
                );

            }

        };


    return (

        <div className="page-content">

            {/* HEADER */}

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        DOCUMENT LIBRARY
                    </div>


                    <h1>
                        Your documents.
                    </h1>


                    <p>

                        Upload and manage the documents
                        you want DocuMind to understand.

                    </p>

                </div>


                {/* UPLOAD BUTTON */}

                <label
                    className={`primary-btn upload-label ${
                        uploading
                            ? "disabled-upload"
                            : ""
                    }`}
                >

                    {uploading
                        ? "Processing PDF..."
                        : "+ Upload Document"}


                    <input
                        type="file"
                        accept="application/pdf,.pdf"
                        hidden
                        onChange={
                            handleUpload
                        }
                        disabled={
                            uploading
                        }
                    />

                </label>

            </div>


            {/* SEARCH */}

            <div className="documents-toolbar">

                <input
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="⌕  Search documents..."
                />


                <span>

                    {filteredDocuments.length}

                    {" "}

                    document
                    {filteredDocuments.length === 1
                        ? ""
                        : "s"}

                </span>

            </div>


            {/* DOCUMENT TABLE */}

            <div className="dashboard-card document-library">

                <div className="library-head">

                    <span>
                        DOCUMENT
                    </span>

                    <span>
                        SIZE
                    </span>

                    <span>
                        UPLOADED
                    </span>

                    <span>
                        STATUS
                    </span>

                    <span>
                        ACTION
                    </span>

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            ◌
                        </div>


                        <h3>
                            Loading documents...
                        </h3>


                        <p>
                            Fetching your document library.
                        </p>

                    </div>

                ) : filteredDocuments.length === 0 ? (

                    /* EMPTY */

                    <div className="empty-state">

                        <div className="empty-icon">
                            ▤
                        </div>


                        <h3>

                            {search
                                ? "No matching documents"
                                : "No documents yet"}

                        </h3>


                        <p>

                            {search
                                ? "Try a different document name."
                                : "Upload your first PDF to start building your knowledge base."}

                        </p>

                    </div>

                ) : (

                    /* DOCUMENTS */

                    filteredDocuments.map(
                        (doc) => (

                            <div
                                className="library-row"
                                key={doc.id}
                            >

                                <div className="document-title">

                                    <span className="pdf-icon">
                                        PDF
                                    </span>


                                    <div>

                                        <strong>

                                            {doc.fileName ||
                                                "Unnamed PDF"}

                                        </strong>


                                        <small>

                                            Document #
                                            {doc.id}

                                        </small>

                                    </div>

                                </div>


                                <span>

                                    {formatFileSize(
                                        doc.fileSize
                                    )}

                                </span>


                                <span>

                                    {doc.uploadedAt
                                        ? new Date(
                                              doc.uploadedAt
                                          ).toLocaleDateString()
                                        : "-"}

                                </span>


                                <span className="green-status">
                                    ● Indexed
                                </span>


                                <button
                                    className="danger-btn"
                                    onClick={() =>
                                        handleDelete(
                                            doc.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        )
                    )

                )}

            </div>

        </div>

    );
}


/* =========================================================
   FILE SIZE FORMATTER
========================================================= */

function formatFileSize(
    bytes
) {

    const size =
        Number(bytes);


    if (
        !Number.isFinite(size) ||
        size <= 0
    ) {

        return "-";

    }


    if (size < 1024) {

        return `${size} B`;

    }


    if (
        size <
        1024 * 1024
    ) {

        return `${Math.round(
            size / 1024
        )} KB`;

    }


    return `${(
        size /
        (1024 * 1024)
    ).toFixed(1)} MB`;

}


/* =========================================================
   AI CHAT
   IMPORTANT CHANGE:
   Backend returns:
   {
       success: true,
       data: {
           answer: "...",
           sources: [...]
       }
   }

   api.js unwraps data.
========================================================= */

function Chat() {

    const [documents, setDocuments] =
        useState([]);

    const [selectedDocument, setSelectedDocument] =
        useState("");

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);


    /* -----------------------------------------------------
       LOAD DOCUMENTS
    ----------------------------------------------------- */

    useEffect(() => {

        getDocuments()

            .then((data) => {

                console.log(
                    "Chat documents received:",
                    data
                );


                setDocuments(
                    Array.isArray(data)
                        ? data
                        : []
                );

            })

            .catch((error) => {

                console.error(
                    "Failed to load chat documents:",
                    error
                );


                setDocuments([]);

            });

    }, []);


    /* -----------------------------------------------------
       SEND QUESTION
    ----------------------------------------------------- */

    const sendQuestion = async () => {

        if (!selectedDocument) {

            alert(
                "Please select a document first."
            );

            return;

        }


        if (
            !question.trim() ||
            loading
        ) {

            return;

        }


        const currentQuestion =
            question.trim();


        /* Add user message */

        setMessages(
            (prev) => [

                ...prev,

                {
                    id:
                        crypto.randomUUID?.() ||
                        Date.now(),

                    type:
                        "user",

                    content:
                        currentQuestion,
                },

            ]
        );


        setQuestion("");

        setLoading(true);


        try {

            /* Ask backend */

            const response =
                await askQuestion(
                    selectedDocument,
                    currentQuestion
                );


            console.log(
                "Normalized chat response:",
                response
            );


            /*
             * Supports answer field
             */

            const answer =

                response?.answer ||

                response?.content ||

                response?.message ||

                "No answer received.";


            /*
             * Sources are optional.
             */

            const sources =

                Array.isArray(
                    response?.sources
                )
                    ? response.sources
                    : [];


            /* Add AI response */

            setMessages(
                (prev) => [

                    ...prev,

                    {
                        id:
                            crypto.randomUUID?.() ||
                            Date.now(),

                        type:
                            "assistant",

                        content:
                            answer,

                        sources:
                            sources,

                    },

                ]
            );


            /*
             * Save lightweight history.
             */

            try {

                const existing =
                    JSON.parse(
                        localStorage.getItem(
                            "documind_history"
                        )
                    ) || [];


                const updated = [

                    {
                        question:
                            currentQuestion,

                        date:
                            new Date()
                                .toLocaleString(),

                    },

                    ...existing,

                ].slice(0, 50);


                localStorage.setItem(
                    "documind_history",
                    JSON.stringify(
                        updated
                    )
                );

            } catch (
                historyError
            ) {

                console.warn(
                    "Could not save chat history:",
                    historyError
                );

            }

        } catch (error) {

            console.error(
                "Chat request failed:",
                error
            );


            const backendError =

                error?.response?.data?.error ||

                error?.response?.data?.message;


            setMessages(
                (prev) => [

                    ...prev,

                    {
                        id:
                            crypto.randomUUID?.() ||
                            Date.now(),

                        type:
                            "assistant",

                        content:

                            backendError ||

                            "Something went wrong while generating the answer.",

                        sources: [],

                        error:
                            true,

                    },

                ]
            );

        } finally {

            setLoading(false);

        }

    };


    /* -----------------------------------------------------
       SUGGESTED QUESTION
    ----------------------------------------------------- */

    const handleSuggestedQuestion =
        (value) => {

            setQuestion(value);

        };


    return (

        <div className="chat-page">

            <div className="chat-main">


                {/* HEADER */}

                <div className="chat-header-section">

                    <div>

                        <div className="section-label">
                            DOCUMENT Q&A
                        </div>


                        <h1>
                            Ask your documents.
                        </h1>

                    </div>


                    <select
                        value={
                            selectedDocument
                        }
                        onChange={(event) =>
                            setSelectedDocument(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Select document
                        </option>


                        {documents.map(
                            (doc) => (

                                <option
                                    key={
                                        doc.id
                                    }
                                    value={
                                        doc.id
                                    }
                                >
                                    {
                                        doc.fileName
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* CHAT AREA */}

                <div className="chat-container">


                    {/* EMPTY CHAT */}

                    {messages.length === 0 ? (

                        <div className="chat-empty">

                            <div className="chat-empty-icon">
                                ◌
                            </div>


                            <h2>
                                Start a conversation
                            </h2>


                            <p>

                                Select a document and
                                ask a question about
                                its contents.

                            </p>


                            <div className="suggested-questions">

                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "Summarize this document"
                                        )
                                    }
                                >
                                    Summarize this document
                                </button>


                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "What are the key points?"
                                        )
                                    }
                                >
                                    What are the key points?
                                </button>


                                <button
                                    onClick={() =>
                                        handleSuggestedQuestion(
                                            "What technologies are mentioned?"
                                        )
                                    }
                                >
                                    What technologies are mentioned?
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* MESSAGES */

                        <div className="messages">

                            {messages.map(
                                (message) => (

                                    <div
                                        className={`message ${
                                            message.type
                                        }`}
                                        key={
                                            message.id
                                        }
                                    >

                                        <div className="message-avatar">

                                            {message.type ===
                                            "user"
                                                ? "S"
                                                : "◇"}

                                        </div>


                                        <div className="message-content">

                                            <span className="message-role">

                                                {message.type ===
                                                "user"
                                                    ? "YOU"
                                                    : "DOCUMIND AI"}

                                            </span>


                                            <p
                                                className={
                                                    message.error
                                                        ? "error-message"
                                                        : ""
                                                }
                                            >
                                                {
                                                    message.content
                                                }
                                            </p>


                                            {/* SOURCES */}

                                            {message.sources?.length >
                                                0 && (

                                                <div className="sources">

                                                    <span className="sources-title">
                                                        SOURCES
                                                    </span>


                                                    {message.sources.map(
                                                        (
                                                            source,
                                                            index
                                                        ) => (

                                                            <div
                                                                className="source-card"
                                                                key={
                                                                    source.id ||
                                                                    index
                                                                }
                                                            >

                                                                <span>

                                                                    {source.page
                                                                        ? `Page ${source.page}`
                                                                        : `Source ${
                                                                              index +
                                                                              1
                                                                          }`}

                                                                </span>


                                                                <p>

                                                                    {source.content ||

                                                                        source.text ||

                                                                        source.chunk ||

                                                                        "Relevant document chunk"}

                                                                </p>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                )
                            )}


                            {/* AI LOADING */}

                            {loading && (

                                <div className="message assistant">

                                    <div className="message-avatar">
                                        ◇
                                    </div>


                                    <div className="message-content">

                                        <span className="message-role">
                                            DOCUMIND AI
                                        </span>


                                        <p className="typing">

                                            Searching document
                                            context and generating
                                            an answer...

                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}

                </div>


                {/* CHAT INPUT */}

                <div className="chat-input-wrapper">

                    <textarea

                        value={
                            question
                        }

                        onChange={(event) =>
                            setQuestion(
                                event.target.value
                            )
                        }

                        onKeyDown={(event) => {

                            if (
                                event.key ===
                                    "Enter" &&
                                !event.shiftKey
                            ) {

                                event.preventDefault();

                                sendQuestion();

                            }

                        }}

                        placeholder="Ask a question about your document..."

                        disabled={
                            loading
                        }

                    />


                    <button

                        className="primary-btn send-btn"

                        onClick={
                            sendQuestion
                        }

                        disabled={
                            loading ||
                            !question.trim()
                        }

                    >

                        {loading
                            ? "..."
                            : "→"}

                    </button>

                </div>

            </div>

        </div>

    );
}


/* =========================================================
   CHAT HISTORY
========================================================= */

function History() {

    const [history] =
        useState(() => {

            try {

                return (
                    JSON.parse(
                        localStorage.getItem(
                            "documind_history"
                        )
                    ) || []
                );

            } catch {

                return [];

            }

        });


    return (

        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        CONVERSATIONS
                    </div>


                    <h1>
                        Chat history.
                    </h1>


                    <p>

                        Review your previous questions
                        and document conversations.

                    </p>

                </div>

            </div>


            <div className="dashboard-card">

                {history.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            ◷
                        </div>


                        <h3>
                            No conversations yet
                        </h3>


                        <p>
                            Your conversations
                            will appear here.
                        </p>

                    </div>

                ) : (

                    history.map(
                        (item, index) => (

                            <div
                                className="history-row"
                                key={index}
                            >

                                <div>

                                    <strong>
                                        {
                                            item.question
                                        }
                                    </strong>


                                    <small>
                                        {
                                            item.date
                                        }
                                    </small>

                                </div>


                                <span>
                                    →
                                </span>

                            </div>

                        )
                    )

                )}

            </div>

        </div>

    );
}


/* =========================================================
   ANALYTICS
========================================================= */

function Analytics() {

    return (

        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        INSIGHTS
                    </div>


                    <h1>
                        Analytics.
                    </h1>


                    <p>

                        Understand how your document
                        knowledge base is being used.

                    </p>

                </div>

            </div>


            <div className="overview-stats">

                <DashboardStat
                    title="Questions"
                    value="—"
                    icon="◌"
                />

                <DashboardStat
                    title="Documents"
                    value="—"
                    icon="▤"
                />

                <DashboardStat
                    title="Avg. Sources"
                    value="—"
                    icon="⌕"
                />

                <DashboardStat
                    title="Indexed Chunks"
                    value="—"
                    icon="▦"
                />

            </div>


            <div className="dashboard-card analytics-chart">

                <div className="card-header">

                    <div>

                        <span className="section-label">
                            ACTIVITY
                        </span>


                        <h3>
                            Questions over time
                        </h3>

                    </div>

                </div>


                <div className="fake-chart">

                    {[
                        25,
                        40,
                        32,
                        65,
                        50,
                        80,
                        62,
                        90,
                        72,
                        100,
                    ].map(
                        (
                            height,
                            index
                        ) => (

                            <div
                                key={index}
                                className="chart-bar"
                                style={{
                                    height:
                                        `${height}%`,
                                }}
                            />

                        )
                    )}

                </div>

            </div>

        </div>

    );
}


/* =========================================================
   KNOWLEDGE BASE
========================================================= */

function KnowledgeBase() {

    return (

        <div className="page-content">

            <div className="page-heading">

                <div>

                    <div className="section-label">
                        SEMANTIC SEARCH
                    </div>


                    <h1>
                        Knowledge base.
                    </h1>


                    <p>

                        Your documents are transformed
                        into searchable vector representations.

                    </p>

                </div>

            </div>


            <div className="knowledge-grid">

                <KnowledgeCard
                    label="VECTOR STORE"
                    title="PostgreSQL + pgvector"
                    text="Document chunks are stored with their embeddings for semantic retrieval."
                />


                <KnowledgeCard
                    label="EMBEDDINGS"
                    title="nomic-embed-text"
                    text="Local embeddings convert document content into vector representations."
                />


                <KnowledgeCard
                    label="LANGUAGE MODEL"
                    title="Llama 3.2"
                    text="Ollama generates grounded answers from retrieved document context."
                />

            </div>

        </div>

    );
}


function KnowledgeCard({
    label,
    title,
    text,
}) {

    return (

        <div className="dashboard-card">

            <span className="section-label">
                {label}
            </span>


            <h3>
                {title}
            </h3>


            <p>
                {text}
            </p>


            <div className="tech-status">

                <span>
                    ●
                </span>

                Ready

            </div>

        </div>

    );
}


/* =========================================================
   SETTINGS
========================================================= */

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


/* =========================================================
   MAIN APP / ROUTES
========================================================= */

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Landing */}

                <Route
                    path="/"
                    element={
                        <LandingPage />
                    }
                />


                {/* Authentication */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/signup"
                    element={
                        <Signup />
                    }
                />


                {/* Main application */}

                <Route
                    path="/app/*"
                    element={
                        <Workspace />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;

import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import Overview from "./Overview";
import Documents from "./Documents";
import ChatPage from "./ChatPage";
import History from "./History";
import Analytics from "./Analytics";
import KnowledgeBase from "./KnowledgeBase";
import Settings from "./Settings";

function WorkspacePage() {
    return (
        <div className="workspace">
            <Sidebar />

            <main className="workspace-main">
                <Topbar />

                <Routes>
                    <Route
                        index
                        element={<Overview />}
                    />

                    <Route
                        path="documents"
                        element={<Documents />}
                    />

                    <Route
                        path="chat"
                        element={<ChatPage />}
                    />

                    <Route
                        path="history"
                        element={<History />}
                    />

                    <Route
                        path="analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="knowledge"
                        element={<KnowledgeBase />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default WorkspacePage;
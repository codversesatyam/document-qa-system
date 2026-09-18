import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WorkspacePage from "./pages/WorkspacePage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected workspace */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/app/*"
                        element={<WorkspacePage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
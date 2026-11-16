
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Automatically attach JWT to every API request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("documind_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Automatically handle expired or invalid JWT
api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        if (
            status === 401 &&
            !requestUrl.includes("/auth/login") &&
            !requestUrl.includes("/auth/register")
        ) {
            localStorage.removeItem("documind_token");

            if (window.location.pathname !== "/login") {
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);

// Get all documents
export const getDocuments = async () => {
    const response = await api.get("/documents");
    const body = response.data;

    return Array.isArray(body)
        ? body
        : Array.isArray(body?.data)
            ? body.data
            : Array.isArray(body?.documents)
                ? body.documents
                : [];
};

// Get document by ID
export const getDocument = async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data?.data || response.data;
};

// Upload document
export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );

    return response.data?.data || response.data;
};

// Delete document
export const deleteDocument = async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data?.data || response.data;
};

// Ask AI question - GENERAL + DOCUMENT CHAT
export const askQuestion = async (documentId, question) => {

    const normalizedDocumentId =
        documentId === null ||
        documentId === undefined ||
        documentId === ""
            ? null
            : Number(documentId);

    const response = await api.post("/chat", {
        documentId: normalizedDocumentId,
        question: question.trim(),
    });

    return response.data?.data || response.data;
};

// Dashboard statistics
export const getDashboardStats = async () => {
    const response = await api.get("/dashboard/stats");
    return response.data?.data || response.data;
};

// Current logged-in user
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// Get chat history
export const getChatHistory = async () => {
    const response = await api.get("/chat/history");
    return response.data?.data || [];
};

// Get single conversation
export const getConversation = async (id) => {
    const response = await api.get(`/chat/history/${id}`);
    return response.data?.data || response.data;
};

export default api;

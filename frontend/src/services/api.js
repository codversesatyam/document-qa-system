import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Automatically attach JWT to every protected API request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("documind_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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

export const getDocument = async (id) => {
    const response = await api.get(`/documents/${id}`);

    return response.data?.data || response.data;
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );

    return response.data?.data || response.data;
};

export const deleteDocument = async (id) => {
    const response = await api.delete(`/documents/${id}`);

    return response.data?.data || response.data;
};

export const askQuestion = async (documentId, question) => {
    const response = await api.post("/chat", {
        documentId: Number(documentId),
        question: question.trim(),
    });

    return response.data?.data || response.data;
};

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

/* =========================================================
   DOCUMENTS
========================================================= */

export const getDocuments = async () => {
    const response = await api.get("/documents");

    console.log("Documents API response:", response.data);

    const body = response.data;

    // Supports:
    // [ ... ]
    // { success: true, data: [ ... ] }
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

    console.log("Document API response:", response.data);

    return response.data?.data || response.data;
};


export const uploadDocument = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );

    console.log("Upload API response:", response.data);

    return response.data?.data || response.data;
};


export const deleteDocument = async (id) => {
    const response = await api.delete(`/documents/${id}`);

    console.log("Delete API response:", response.data);

    return response.data?.data || response.data;
};


/* =========================================================
   CHAT
========================================================= */

export const askQuestion = async (documentId, question) => {

    const response = await api.post("/chat", {
        documentId: Number(documentId),
        question: question.trim(),
    });

    console.log("Chat API response:", response.data);

    // Supports:
    // {
    //     success: true,
    //     data: {
    //         answer: "...",
    //         sources: [...]
    //     }
    // }

    return response.data?.data || response.data;
};


export default api;
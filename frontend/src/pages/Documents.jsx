import { useEffect, useMemo, useState } from "react";

import {
    getDocuments,
    uploadDocument,
    deleteDocument,
} from "../services/api";


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


export default Documents;
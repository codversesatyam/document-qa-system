package com.satyam.document_qa.controller;

import com.satyam.document_qa.dto.ApiResponse;
import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Document>> uploadDocument(
            @RequestParam("file") MultipartFile file) {

        try {

            Document document =
                    documentService.uploadDocument(file);

            return ResponseEntity.ok(
                    ApiResponse.success(document)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(
                            "INVALID_FILE",
                            e.getMessage()
                    ));

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error(
                            "FILE_UPLOAD_ERROR",
                            "Failed to process the uploaded file"
                    ));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Document>>> getAllDocuments() {

        List<Document> documents =
                documentService.getAllDocuments();

        return ResponseEntity.ok(
                ApiResponse.success(documents)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Document>> getDocumentById(
            @PathVariable Long id) {

        try {

            Document document =
                    documentService.getDocumentById(id);

            return ResponseEntity.ok(
                    ApiResponse.success(document)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(404)
                    .body(ApiResponse.error(
                            "DOCUMENT_NOT_FOUND",
                            e.getMessage()
                    ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDocument(
            @PathVariable Long id) {

        try {

            documentService.deleteDocument(id);

            return ResponseEntity.ok(
                    ApiResponse.success(
                            "Document deleted successfully"
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(404)
                    .body(ApiResponse.error(
                            "DOCUMENT_NOT_FOUND",
                            e.getMessage()
                    ));

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error(
                            "DOCUMENT_DELETE_ERROR",
                            "Failed to delete document"
                    ));
        }
    }
}
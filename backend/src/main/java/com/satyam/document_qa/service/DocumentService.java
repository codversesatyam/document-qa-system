package com.satyam.document_qa.service;

import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.repository.DocumentChunkRepository;
import com.satyam.document_qa.repository.DocumentRepository;
import com.satyam.document_qa.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentChunkRepository documentChunkRepository;
    private final UserRepository userRepository;
    private final PdfTextExtractor pdfTextExtractor;
    private final DocumentChunkService documentChunkService;
    private final VectorStoreService vectorStoreService;

    private final Path uploadDirectory = Paths.get("uploads");

    public DocumentService(
            DocumentRepository documentRepository,
            DocumentChunkRepository documentChunkRepository,
            UserRepository userRepository,
            PdfTextExtractor pdfTextExtractor,
            DocumentChunkService documentChunkService,
            VectorStoreService vectorStoreService) {

        this.documentRepository = documentRepository;
        this.documentChunkRepository = documentChunkRepository;
        this.userRepository = userRepository;
        this.pdfTextExtractor = pdfTextExtractor;
        this.documentChunkService = documentChunkService;
        this.vectorStoreService = vectorStoreService;
    }

    /**
     * Get the currently authenticated user.
     */
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Authentication required");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new AccessDeniedException(
                                "Authenticated user not found"
                        ));
    }

    /**
     * Upload a document and assign it to the logged-in user.
     */
    public Document uploadDocument(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String contentType = file.getContentType();

        if (!"application/pdf".equalsIgnoreCase(contentType)) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        // Create uploads directory if it doesn't exist
        Files.createDirectories(uploadDirectory);

        // Generate unique stored filename
        String storedFileName =
                UUID.randomUUID() + "_" + originalFileName;

        Path filePath = uploadDirectory.resolve(storedFileName);

        // Save physical file
        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        // Extract PDF text
        String extractedText =
                pdfTextExtractor.extractText(filePath);

        // Create document entity
        Document document = new Document(
                originalFileName,
                contentType,
                file.getSize(),
                filePath.toString()
        );

        // IMPORTANT:
        // Assign document to currently logged-in user
        User currentUser = getCurrentUser();

        document.setUser(currentUser);

        // Save document
        Document savedDocument =
                documentRepository.save(document);

        // Create document chunks
        documentChunkService.createChunks(
                savedDocument,
                extractedText
        );

        return savedDocument;
    }

    /**
     * Return ONLY documents belonging to the logged-in user.
     */
    public List<Document> getAllDocuments() {

        User currentUser = getCurrentUser();

        return documentRepository.findByUser(currentUser);
    }

    /**
     * Get a document only if it belongs to the logged-in user.
     */
    public Document getDocumentById(Long id) {

        Document document = documentRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Document not found"
                        ));

        User currentUser = getCurrentUser();

        if (!document.getUser().getId()
                .equals(currentUser.getId())) {

            throw new AccessDeniedException(
                    "You do not have permission to access this document"
            );
        }

        return document;
    }

    /**
     * Delete a document only if it belongs to
     * the logged-in user.
     */
    @Transactional
    public void deleteDocument(Long id) throws IOException {

        // This also checks ownership
        Document document = getDocumentById(id);

        // Delete vectors
        vectorStoreService.deleteByDocumentId(id);

        // Delete document chunks
        documentChunkRepository.deleteByDocumentId(id);

        // Delete physical file
        Path filePath =
                Paths.get(document.getFilePath());

        Files.deleteIfExists(filePath);

        // Delete document record
        documentRepository.delete(document);
    }
}
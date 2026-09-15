package com.satyam.document_qa.service;

import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.repository.DocumentChunkRepository;
import com.satyam.document_qa.repository.DocumentRepository;
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
    private final PdfTextExtractor pdfTextExtractor;
    private final DocumentChunkService documentChunkService;
    private final VectorStoreService vectorStoreService;

    private final Path uploadDirectory = Paths.get("uploads");

    public DocumentService(
            DocumentRepository documentRepository,
            DocumentChunkRepository documentChunkRepository,
            PdfTextExtractor pdfTextExtractor,
            DocumentChunkService documentChunkService,
            VectorStoreService vectorStoreService) {

        this.documentRepository = documentRepository;
        this.documentChunkRepository = documentChunkRepository;
        this.pdfTextExtractor = pdfTextExtractor;
        this.documentChunkService = documentChunkService;
        this.vectorStoreService = vectorStoreService;
    }

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

        Files.createDirectories(uploadDirectory);

        String storedFileName =
                UUID.randomUUID() + "_" + originalFileName;

        Path filePath =
                uploadDirectory.resolve(storedFileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        String extractedText =
                pdfTextExtractor.extractText(filePath);

        Document document = new Document(
                originalFileName,
                contentType,
                file.getSize(),
                filePath.toString()
        );

        Document savedDocument =
                documentRepository.save(document);

        documentChunkService.createChunks(
                savedDocument,
                extractedText
        );

        return savedDocument;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Long id) {

        return documentRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Document not found with id: " + id
                        ));
    }

    @Transactional
    public void deleteDocument(Long id) throws IOException {

        Document document =
                documentRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Document not found with id: " + id
                                ));

        // 1. Delete vector embeddings
        vectorStoreService.deleteByDocumentId(id);

        // 2. Delete document chunks
        documentChunkRepository.deleteByDocumentId(id);

        // 3. Delete physical PDF
        Path filePath =
                Paths.get(document.getFilePath());

        Files.deleteIfExists(filePath);

        // 4. Delete document record
        documentRepository.delete(document);
    }
}
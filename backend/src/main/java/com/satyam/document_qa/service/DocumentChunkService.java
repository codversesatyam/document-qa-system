package com.satyam.document_qa.service;

import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.DocumentChunk;
import com.satyam.document_qa.repository.DocumentChunkRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentChunkService {

    private final TextChunker textChunker;
    private final DocumentChunkRepository documentChunkRepository;
    private final VectorStoreService vectorStoreService;

    public DocumentChunkService(
            TextChunker textChunker,
            DocumentChunkRepository documentChunkRepository,
            VectorStoreService vectorStoreService) {

        this.textChunker = textChunker;
        this.documentChunkRepository = documentChunkRepository;
        this.vectorStoreService = vectorStoreService;
    }

    public List<DocumentChunk> createChunks(
            Document document,
            String extractedText) {

        // 1. Split extracted text into chunks
        List<String> chunks =
                textChunker.splitText(extractedText);

        // 2. Create DocumentChunk entities
        List<DocumentChunk> documentChunks =
                new ArrayList<>();

        for (int i = 0; i < chunks.size(); i++) {

            DocumentChunk documentChunk =
                    new DocumentChunk(
                            document,
                            chunks.get(i),
                            i
                    );

            documentChunks.add(documentChunk);
        }

        // 3. Save chunks in PostgreSQL
        List<DocumentChunk> savedChunks =
                documentChunkRepository.saveAll(documentChunks);

        // 4. Generate embeddings and store in PGVector
        vectorStoreService.storeChunks(savedChunks);

        return savedChunks;
    }
}
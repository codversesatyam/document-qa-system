package com.satyam.document_qa.service;

import com.satyam.document_qa.entity.DocumentChunk;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VectorStoreService {

    private final VectorStore vectorStore;

    public VectorStoreService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void storeChunks(List<DocumentChunk> chunks) {

        System.out.println("========== VECTOR STORE ==========");
        System.out.println("Received chunks: " + chunks.size());

        List<Document> documents =
                chunks.stream()
                        .map(chunk -> {

                            System.out.println(
                                    "Preparing chunk: " +
                                            chunk.getChunkIndex()
                            );

                            return Document.builder()
                                    .text(chunk.getContent())
                                    .metadata(
                                            "documentId",
                                            chunk.getDocument().getId()
                                    )
                                    .metadata(
                                            "chunkIndex",
                                            chunk.getChunkIndex()
                                    )
                                    .build();
                        })
                        .toList();

        System.out.println(
                "Sending " +
                        documents.size() +
                        " documents to VectorStore..."
        );

        vectorStore.add(documents);

        System.out.println("VectorStore.add() completed successfully.");
        System.out.println("========== END VECTOR STORE ==========");
    }


    public void deleteByDocumentId(Long documentId) {

        List<Document> documents =
                vectorStore.similaritySearch(
                        SearchRequest.builder()
                                .query(" ")
                                .topK(1000)
                                .filterExpression(
                                        "documentId == " + documentId
                                )
                                .build()
                );

        if (!documents.isEmpty()) {

            List<String> ids =
                    documents.stream()
                            .map(Document::getId)
                            .toList();

            vectorStore.delete(ids);
        }
    }
}
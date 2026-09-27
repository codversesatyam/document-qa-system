package com.satyam.document_qa.service;

import com.satyam.document_qa.dto.ChatResponse;
import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.repository.ChatHistoryRepository;
import com.satyam.document_qa.repository.DocumentRepository;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    private final DocumentRepository documentRepository;
    private final ChatHistoryRepository chatHistoryRepository;

    public ChatService(
            ChatClient.Builder chatClientBuilder,
            VectorStore vectorStore,
            DocumentRepository documentRepository,
            ChatHistoryRepository chatHistoryRepository) {

        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
        this.documentRepository = documentRepository;
        this.chatHistoryRepository = chatHistoryRepository;
    }

    public ChatResponse askQuestion(
            Long documentId,
            String question) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException(
                    "Authentication required"
            );
        }

        String email = authentication.getName();

        // Find document
        Document document =
                documentRepository.findById(documentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Document not found"
                                ));

        // Check ownership
        User documentOwner = document.getUser();

        if (!documentOwner.getEmail().equals(email)) {

            throw new AccessDeniedException(
                    "You do not have permission to access this document"
            );
        }

        // Search vector database
        List<org.springframework.ai.document.Document> relevantDocuments =
                vectorStore.similaritySearch(
                        SearchRequest.builder()
                                .query(question)
                                .topK(5)
                                .filterExpression(
                                        "documentId == " + documentId
                                )
                                .build()
                );

        // Build context
        String context =
                relevantDocuments.stream()
                        .map(
                                org.springframework.ai.document.Document::getText
                        )
                        .reduce(
                                "",
                                (a, b) -> a + "\n\n" + b
                        );

        // Build AI prompt
        String prompt = """
                You are a document question-answering assistant.

                Answer the user's question using ONLY the information
                provided in the document context below.

                If the answer cannot be found in the context,
                say:
                "I couldn't find that information in the document."

                Do not make up information.

                Document Context:
                %s

                User Question:
                %s
                """.formatted(
                context,
                question
        );

        // Ask AI
        String answer =
                chatClient
                        .prompt()
                        .user(prompt)
                        .call()
                        .content();

        // Build sources
        List<ChatResponse.Source> sources =
                relevantDocuments.stream()
                        .map(chunk -> {

                            Integer chunkIndex =
                                    ((Number)
                                            chunk.getMetadata()
                                                    .get("chunkIndex"))
                                            .intValue();

                            return new ChatResponse.Source(
                                    chunkIndex,
                                    chunk.getText()
                            );
                        })
                        .toList();

        // -----------------------------------------
        // Save chat question for Analytics
        // -----------------------------------------

        ChatHistory history =
                new ChatHistory(
                        documentOwner,
                        document,
                        question,
                        sources.size()
                );

        chatHistoryRepository.save(history);

        // Return response
        return new ChatResponse(
                question,
                answer,
                documentId,
                sources
        );
    }
}
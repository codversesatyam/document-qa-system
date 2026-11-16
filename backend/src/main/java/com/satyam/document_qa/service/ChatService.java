
package com.satyam.document_qa.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.satyam.document_qa.dto.ChatHistoryResponse;
import com.satyam.document_qa.dto.ChatResponse;
import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.User;

import com.satyam.document_qa.repository.ChatHistoryRepository;
import com.satyam.document_qa.repository.DocumentRepository;
import com.satyam.document_qa.repository.UserRepository;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    private final DocumentRepository documentRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ChatService(
            ChatClient.Builder chatClientBuilder,
            VectorStore vectorStore,
            DocumentRepository documentRepository,
            ChatHistoryRepository chatHistoryRepository,
            UserRepository userRepository,
            ObjectMapper objectMapper) {

        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
        this.documentRepository = documentRepository;
        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    // =========================================
    // ASK QUESTION - GENERAL + DOCUMENT CHAT
    // =========================================

    public ChatResponse askQuestion(Long documentId, String question) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                "anonymousUser".equals(authentication.getPrincipal())) {

            throw new AccessDeniedException("Authentication required");
        }

        String email = authentication.getName();

        // Get authenticated user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        Document document = null;

        // Validate document ownership if document is selected
        if (documentId != null) {

            document = documentRepository.findById(documentId)
                    .orElseThrow(() ->
                            new IllegalArgumentException("Document not found"));

            if (!document.getUser().getEmail().equals(email)) {
                throw new AccessDeniedException(
                        "You do not have permission to access this document"
                );
            }
        }

        // =====================================
        // DOCUMENT RETRIEVAL
        // =====================================

        List<org.springframework.ai.document.Document> relevantDocuments =
                new ArrayList<>();

        // Skip vector search for general chat
        if (documentId != null) {

            relevantDocuments = vectorStore.similaritySearch(
                    SearchRequest.builder()
                            .query(question)
                            .topK(5)
                            .filterExpression("documentId == " + documentId)
                            .build()
            );
        }

        // Build document context
        String context = relevantDocuments.stream()
                .map(org.springframework.ai.document.Document::getText)
                .reduce("", (a, b) -> a + "\n\n" + b);

        // =====================================
        // HYBRID AI PROMPT
        // =====================================

        String prompt = """
                You are DocuMind, a helpful, intelligent and friendly AI assistant.

                Your purpose is to answer questions naturally and accurately,
                like a modern conversational AI chatbot.

                GENERAL CHAT RULES:

                - Answer general questions using your general knowledge.
                - Explain concepts in simple language when appropriate.
                - Provide examples, comparisons, summaries and code when useful.
                - Handle follow-up questions naturally.
                - Do not force every question to relate to an uploaded document.

                DOCUMENT RULES:

                - When document context is available and relevant,
                  prioritize the information from that document.
                - You may supplement document information with general knowledge.
                - Clearly distinguish document content from additional explanations
                  when necessary.
                - Never claim something is in the document unless supported
                  by the retrieved context.
                - If the requested document information is not available
                  in the retrieved context, be transparent.

                RESPONSE RULES:

                - Give direct and useful answers.
                - Use headings and bullet points when they improve readability.
                - Avoid unnecessarily short or unnecessarily long answers.
                - Never invent facts, references or document sources.
                - Maintain a natural conversational tone.

                Document Context:
                %s

                User Question:
                %s
                """.formatted(
                context.isBlank()
                        ? "No document context available. Use general knowledge."
                        : context,
                question
        );

        // =====================================
        // GENERATE AI RESPONSE
        // =====================================

        String answer = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        // =====================================
        // BUILD SOURCES
        // =====================================

        List<ChatResponse.Source> sources =
                relevantDocuments.stream()
                        .map(chunk -> {

                            Object index =
                                    chunk.getMetadata().get("chunkIndex");

                            Integer chunkIndex = index instanceof Number
                                    ? ((Number) index).intValue()
                                    : null;

                            return new ChatResponse.Source(
                                    chunkIndex,
                                    chunk.getText()
                            );
                        })
                        .toList();

        // =====================================
        // SAVE CHAT HISTORY
        // =====================================

        try {

            String sourcesJson =
                    objectMapper.writeValueAsString(sources);

            ChatHistory history = new ChatHistory(
                    user,
                    document,
                    question,
                    answer,
                    sourcesJson,
                    sources.size()
            );

            chatHistoryRepository.save(history);

        } catch (JsonProcessingException e) {

            throw new IllegalStateException(
                    "Failed to save chat sources",
                    e
            );
        }

        // =====================================
        // RETURN RESPONSE
        // =====================================

        return new ChatResponse(
                question,
                answer,
                documentId,
                sources
        );
    }

    // =========================================
    // GET ALL CONVERSATIONS
    // =========================================

    public List<ChatHistoryResponse> getChatHistory() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException("Authentication required");
        }

        String email = authentication.getName();

        return chatHistoryRepository
                .findByUser_EmailOrderByAskedAtDesc(email)
                .stream()
                .map(this::mapToHistoryResponse)
                .toList();
    }

    // =========================================
    // GET SINGLE CONVERSATION
    // =========================================

    public ChatHistoryResponse getConversation(Long id) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException("Authentication required");
        }

        String email = authentication.getName();

        ChatHistory history =
                chatHistoryRepository
                        .findByIdAndUser_Email(id, email)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Conversation not found"
                                ));

        return mapToHistoryResponse(history);
    }

    // =========================================
    // MAP ENTITY TO RESPONSE DTO
    // =========================================

    private ChatHistoryResponse mapToHistoryResponse(
            ChatHistory history) {

        List<ChatResponse.Source> sources = new ArrayList<>();

        if (history.getSources() != null &&
                !history.getSources().isBlank()) {

            try {

                sources = objectMapper.readValue(
                        history.getSources(),
                        new TypeReference<List<ChatResponse.Source>>() {}
                );

            } catch (JsonProcessingException e) {

                throw new IllegalStateException(
                        "Failed to read saved conversation sources",
                        e
                );
            }
        }

        Document document = history.getDocument();

        return new ChatHistoryResponse(
                history.getId(),
                history.getQuestion(),
                history.getAnswer(),
                document != null ? document.getId() : null,
                document != null ? document.getFileName() : "General Chat",
                sources,
                history.getSourceCount(),
                history.getAskedAt()
        );
    }
}


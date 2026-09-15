package com.satyam.document_qa.service;

import com.satyam.document_qa.dto.ChatResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public ChatService(
            ChatClient.Builder chatClientBuilder,
            VectorStore vectorStore) {

        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
    }

    public ChatResponse askQuestion(
            Long documentId,
            String question) {

        // Search only inside the requested document
        List<Document> relevantDocuments =
                vectorStore.similaritySearch(
                        SearchRequest.builder()
                                .query(question)
                                .topK(5)
                                .filterExpression(
                                        "documentId == " + documentId
                                )
                                .build()
                );

        // Build context from retrieved chunks
        String context = relevantDocuments.stream()
                .map(Document::getText)
                .reduce("", (a, b) -> a + "\n\n" + b);

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
                """.formatted(context, question);

        String answer = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        // Convert retrieved documents into API sources
        List<ChatResponse.Source> sources =
                relevantDocuments.stream()
                        .map(document -> {

                            Integer chunkIndex =
                                    ((Number) document
                                            .getMetadata()
                                            .get("chunkIndex"))
                                            .intValue();

                            return new ChatResponse.Source(
                                    chunkIndex,
                                    document.getText()
                            );
                        })
                        .toList();

        return new ChatResponse(
                question,
                answer,
                documentId,
                sources
        );
    }
}
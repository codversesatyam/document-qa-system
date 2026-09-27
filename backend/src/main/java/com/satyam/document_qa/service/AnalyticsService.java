package com.satyam.document_qa.service;

import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.repository.ChatHistoryRepository;
import com.satyam.document_qa.repository.DocumentChunkRepository;
import com.satyam.document_qa.repository.DocumentRepository;
import com.satyam.document_qa.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AnalyticsService {

    private final DocumentRepository documentRepository;
    private final DocumentChunkRepository documentChunkRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;

    public AnalyticsService(
            DocumentRepository documentRepository,
            DocumentChunkRepository documentChunkRepository,
            ChatHistoryRepository chatHistoryRepository,
            UserRepository userRepository) {

        this.documentRepository = documentRepository;
        this.documentChunkRepository = documentChunkRepository;
        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> getAnalytics() {

        User currentUser = getCurrentUser();

        List<Document> documents =
                documentRepository.findByUser(currentUser);

        long totalDocuments =
                documents.size();

        long totalStorage =
                documents.stream()
                        .mapToLong(Document::getFileSize)
                        .sum();

        long totalChunks =
                documentChunkRepository
                        .countByDocument_User(currentUser);

        long totalQuestions =
                chatHistoryRepository
                        .countByUser(currentUser);

        List<ChatHistory> history =
                chatHistoryRepository
                        .findByUserOrderByAskedAtAsc(currentUser);

        Map<String, Long> activity =
                buildActivity(history);

        double averageSources =
                history.stream()
                        .mapToInt(ChatHistory::getSourceCount)
                        .average()
                        .orElse(0.0);

        Map<String, Object> analytics =
                new HashMap<>();

        analytics.put(
                "documents",
                totalDocuments
        );

        analytics.put(
                "storageBytes",
                totalStorage
        );

        analytics.put(
                "indexedChunks",
                totalChunks
        );

        analytics.put(
                "questions",
                totalQuestions
        );

        analytics.put(
                "averageSources",
                Math.round(averageSources * 10.0) / 10.0
        );

        analytics.put(
                "activity",
                activity
        );

        return analytics;
    }

    private Map<String, Long> buildActivity(
            List<ChatHistory> history) {

        Map<String, Long> activity =
                new LinkedHashMap<>();

        LocalDate today =
                LocalDate.now();

        // Last 7 days
        for (int i = 6; i >= 0; i--) {

            LocalDate date =
                    today.minusDays(i);

            activity.put(
                    date.toString(),
                    0L
            );
        }

        for (ChatHistory item : history) {

            LocalDate date =
                    item.getAskedAt().toLocalDate();

            String dateKey =
                    date.toString();

            if (activity.containsKey(dateKey)) {

                activity.put(
                        dateKey,
                        activity.get(dateKey) + 1
                );
            }
        }

        return activity;
    }

    private User getCurrentUser() {

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

        String email =
                authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new AccessDeniedException(
                                "Authenticated user not found"
                        ));
    }
}
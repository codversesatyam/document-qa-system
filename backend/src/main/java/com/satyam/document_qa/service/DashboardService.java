package com.satyam.document_qa.service;

import com.satyam.document_qa.dto.DashboardStatsResponse;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.repository.ChatHistoryRepository;
import com.satyam.document_qa.repository.DocumentChunkRepository;
import com.satyam.document_qa.repository.DocumentRepository;
import com.satyam.document_qa.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;

@Service

public class DashboardService {

    private final DocumentRepository documentRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    private final DocumentChunkRepository documentChunkRepository;
    private final UserRepository userRepository;

    public DashboardService(
            DocumentRepository documentRepository,
            ChatHistoryRepository chatHistoryRepository,
            DocumentChunkRepository documentChunkRepository,
            UserRepository userRepository) {

        this.documentRepository = documentRepository;
        this.chatHistoryRepository = chatHistoryRepository;
        this.documentChunkRepository = documentChunkRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated()){
            throw new AccessDeniedException("Authentication Required");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email).
                orElseThrow(() -> new AccessDeniedException("Authenticated User not found"));

    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() throws AccessDeniedException {
        User user = getCurrentUser();

        long totalDocuments = documentRepository.countByUser(user);

        long totalQuestions = chatHistoryRepository.countByUser(user);

        long totalChunks = documentChunkRepository.countByDocument_User(user);

        return new DashboardStatsResponse(
                totalDocuments ,
                totalQuestions,
                totalChunks,
                "ONLINE"
        );
    }




}
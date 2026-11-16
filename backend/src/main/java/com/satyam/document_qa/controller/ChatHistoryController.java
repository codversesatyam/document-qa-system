package com.satyam.document_qa.controller;

import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.repository.ChatHistoryRepository;
import com.satyam.document_qa.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class ChatHistoryController {

    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;

    public ChatHistoryController(
            ChatHistoryRepository chatHistoryRepository,
            UserRepository userRepository) {

        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<ChatHistory> getHistory() {

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

        User currentUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new AccessDeniedException(
                                        "Authenticated user not found"
                                ));

        return chatHistoryRepository
                .findByUserOrderByAskedAtAsc(currentUser);
    }
}
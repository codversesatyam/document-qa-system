package com.satyam.document_qa.controller;

import com.satyam.document_qa.dto.ApiResponse;
import com.satyam.document_qa.dto.ChatRequest;
import com.satyam.document_qa.dto.ChatResponse;
import com.satyam.document_qa.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChatResponse>> askQuestion(
            @RequestBody ChatRequest request) {

        if (request.getDocumentId() == null) {

            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(
                            "DOCUMENT_ID_REQUIRED",
                            "documentId is required"
                    ));
        }

        if (request.getQuestion() == null ||
                request.getQuestion().isBlank()) {

            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(
                            "QUESTION_REQUIRED",
                            "Question cannot be empty"
                    ));
        }

        ChatResponse response =
                chatService.askQuestion(
                        request.getDocumentId(),
                        request.getQuestion()
                );

        return ResponseEntity.ok(
                ApiResponse.success(response)
        );
    }
}
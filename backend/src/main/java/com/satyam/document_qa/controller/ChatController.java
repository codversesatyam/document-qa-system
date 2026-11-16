
package com.satyam.document_qa.controller;

import com.satyam.document_qa.dto.ApiResponse;
import com.satyam.document_qa.dto.ChatRequest;
import com.satyam.document_qa.dto.ChatResponse;
import com.satyam.document_qa.dto.ChatHistoryResponse;
import com.satyam.document_qa.service.ChatService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        if (request.getQuestion() == null ||
                request.getQuestion().isBlank()) {

            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(
                            "QUESTION_REQUIRED",
                            "Question cannot be empty"
                    ));
        }

        ChatResponse response = chatService.askQuestion(
                request.getDocumentId(),
                request.getQuestion()
        );

        return ResponseEntity.ok(
                ApiResponse.success(response)
        );
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<ChatHistoryResponse>>> getChatHistory() {

        List<ChatHistoryResponse> history =
                chatService.getChatHistory();

        return ResponseEntity.ok(
                ApiResponse.success(history)
        );
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<ApiResponse<ChatHistoryResponse>> getConversation(
            @PathVariable Long id) {

        ChatHistoryResponse conversation =
                chatService.getConversation(id);

        return ResponseEntity.ok(
                ApiResponse.success(conversation)
        );
    }
}


package com.satyam.document_qa.controller;

import com.satyam.document_qa.dto.LoginRequest;
import com.satyam.document_qa.dto.RegisterRequest;
import com.satyam.document_qa.entity.User;
import com.satyam.document_qa.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174"
        }
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        try {

            User user = authService.register(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new RegisterResponse(
                            user.getId(),
                            user.getName(),
                            user.getEmail()
                    ));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {
        try {

            String token = authService.login(request);

            return ResponseEntity.ok(
                    new LoginResponse(token)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    public record RegisterResponse(
            Long id,
            String name,
            String email
    ) {
    }

    public record LoginResponse(
            String token
    ) {
    }
}
package com.satyam.document_qa.controller;

import com.satyam.document_qa.service.AnalyticsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(
            AnalyticsService analyticsService) {

        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics() throws AccessDeniedException {

        return ResponseEntity.ok(
                analyticsService.getAnalytics()
        );
    }
}

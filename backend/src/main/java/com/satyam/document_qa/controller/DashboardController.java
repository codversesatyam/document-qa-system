package com.satyam.document_qa.controller;


import com.satyam.document_qa.dto.ApiResponse;
import com.satyam.document_qa.dto.DashboardStatsResponse;
import com.satyam.document_qa.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }


    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() throws AccessDeniedException {

        DashboardStatsResponse stats =
                dashboardService.getDashboardStats();

        return ResponseEntity.ok(
                ApiResponse.success(stats)
        );
    }


}

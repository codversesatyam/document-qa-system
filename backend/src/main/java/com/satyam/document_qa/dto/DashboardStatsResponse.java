package com.satyam.document_qa.dto;

public class DashboardStatsResponse {

    private long totalDocuments;

    private long totalQuestions;

    private long totalChunks;

    private String systemStatus;

    public DashboardStatsResponse(long totalDocuments, long totalQuestions, long totalChunks, String systemStatus) {
        this.totalDocuments = totalDocuments;
        this.totalQuestions = totalQuestions;
        this.totalChunks = totalChunks;
        this.systemStatus = systemStatus;
    }

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public long getTotalChunks() {
        return totalChunks;
    }

    public String getSystemStatus() {
        return systemStatus;
    }
}


package com.satyam.document_qa.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ChatHistoryResponse {

    private Long id;
    private String question;
    private String answer;
    private Long documentId;
    private String documentName;
    private List<ChatResponse.Source> sources;
    private Integer sourceCount;
    private LocalDateTime askedAt;

    public ChatHistoryResponse(
            Long id,
            String question,
            String answer,
            Long documentId,
            String documentName,
            List<ChatResponse.Source> sources,
            Integer sourceCount,
            LocalDateTime askedAt) {

        this.id = id;
        this.question = question;
        this.answer = answer;
        this.documentId = documentId;
        this.documentName = documentName;
        this.sources = sources;
        this.sourceCount = sourceCount;
        this.askedAt = askedAt;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public String getDocumentName() {
        return documentName;
    }

    public List<ChatResponse.Source> getSources() {
        return sources;
    }

    public Integer getSourceCount() {
        return sourceCount;
    }

    public LocalDateTime getAskedAt() {
        return askedAt;
    }
}

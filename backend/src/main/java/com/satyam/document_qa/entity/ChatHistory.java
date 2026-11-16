
package com.satyam.document_qa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_history")
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "document_id", nullable = true)
    private Document document;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column(columnDefinition = "TEXT")
    private String sources;

    @Column(nullable = false)
    private Integer sourceCount;

    @Column(nullable = false)
    private LocalDateTime askedAt;

    public ChatHistory() {
    }

    public ChatHistory(
            User user,
            Document document,
            String question,
            String answer,
            String sources,
            Integer sourceCount) {

        this.user = user;
        this.document = document;
        this.question = question;
        this.answer = answer;
        this.sources = sources;
        this.sourceCount = sourceCount;
        this.askedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public String getSources() {
        return sources;
    }

    public Integer getSourceCount() {
        return sourceCount;
    }

    public LocalDateTime getAskedAt() {
        return askedAt;
    }
}


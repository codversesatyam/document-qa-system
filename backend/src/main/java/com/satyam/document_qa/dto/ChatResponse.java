package com.satyam.document_qa.dto;

import java.util.List;

public class ChatResponse {

    private String question;
    private String answer;
    private Long documentId;
    private List<Source> sources;

    public ChatResponse(
            String question,
            String answer,
            Long documentId,
            List<Source> sources) {

        this.question = question;
        this.answer = answer;
        this.documentId = documentId;
        this.sources = sources;
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

    public List<Source> getSources() {
        return sources;
    }

    public static class Source {

        private Integer chunkIndex;
        private String content;

        public Source(Integer chunkIndex, String content) {
            this.chunkIndex = chunkIndex;
            this.content = content;
        }

        public Integer getChunkIndex() {
            return chunkIndex;
        }

        public String getContent() {
            return content;
        }
    }
}
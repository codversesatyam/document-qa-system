package com.satyam.document_qa.repository;

import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {

    long countByUser(User user);

    List<ChatHistory> findByUserOrderByAskedAtAsc(User user);
}
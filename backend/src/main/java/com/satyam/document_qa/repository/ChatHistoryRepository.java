package com.satyam.document_qa.repository;

import com.satyam.document_qa.entity.ChatHistory;
import com.satyam.document_qa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {

    long countByUser(User user);

    List<ChatHistory> findByUserOrderByAskedAtAsc(User user);

    List<ChatHistory> findByUser_EmailOrderByAskedAtDesc(String email);

    Optional<ChatHistory> findByIdAndUser_Email(Long id , String email);
}
package com.satyam.document_qa.repository;

import com.satyam.document_qa.entity.Document;
import com.satyam.document_qa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByUser(User user);
}
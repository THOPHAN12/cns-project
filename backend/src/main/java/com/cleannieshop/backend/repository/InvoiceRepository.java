package com.cleannieshop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    List<Invoice> findAllByOrderByDateCreatedDesc();
    List<Invoice> findByUser_UserIdOrderByDateCreatedDesc(String userId);
}

package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {

}

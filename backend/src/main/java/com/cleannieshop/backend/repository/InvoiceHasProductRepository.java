package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.InvoiceHasProduct;
import com.cleannieshop.backend.model.composite_keys.InvoiceHasProductKey;

@Repository
public interface InvoiceHasProductRepository extends JpaRepository<InvoiceHasProduct, InvoiceHasProductKey> {
    
}

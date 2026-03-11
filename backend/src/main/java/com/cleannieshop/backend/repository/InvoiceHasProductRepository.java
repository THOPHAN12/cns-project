package com.cleannieshop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cleannieshop.backend.model.Invoice;
import com.cleannieshop.backend.model.InvoiceHasProduct;
import com.cleannieshop.backend.model.composite_keys.InvoiceHasProductKey;

public interface InvoiceHasProductRepository extends JpaRepository<InvoiceHasProduct, InvoiceHasProductKey> {
    @Query("SELECT ihp FROM InvoiceHasProduct ihp JOIN FETCH ihp.product WHERE ihp.invoice = :invoice")
    List<InvoiceHasProduct> findByInvoice(@Param("invoice") Invoice invoice);
}

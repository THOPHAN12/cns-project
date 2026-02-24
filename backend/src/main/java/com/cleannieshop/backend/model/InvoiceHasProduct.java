package com.cleannieshop.backend.model;

import java.util.List;

import com.cleannieshop.backend.config.StringListConverter;
import com.cleannieshop.backend.model.composite_keys.InvoiceHasProductKey;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "invoice-has-product")
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceHasProduct {
    @EmbeddedId
    private InvoiceHasProductKey invoiceHasProductKey;

    @ManyToOne
    @MapsId("invoiceId")
    @JsonManagedReference
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @ManyToOne
    @MapsId("productId")
    @JsonManagedReference
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> sizes;
}

package com.cleannieshop.backend.model.composite_keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceHasProductKey implements Serializable {
    @Column(name = "invoice_id")
    private String invoiceId;
    @Column(name = "product_id")
    private String productId;
}

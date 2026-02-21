package com.cleannieshop.backend.dto;

import java.util.Date;

import lombok.Data;

@Data
public class InvoiceResponseDTO {
    private String invoiceId;
    private Date dateCreated;
    private double totalPrice;
}

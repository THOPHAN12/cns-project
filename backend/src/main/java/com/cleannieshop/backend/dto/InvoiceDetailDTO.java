package com.cleannieshop.backend.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class InvoiceDetailDTO {
    private String invoiceId;
    private String customerFullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String payMethodOption;
    private Date dateCreated;
    private double totalPrice;
    private String status;
    private String userId;
    private List<InvoiceItemDTO> items;
}

package com.cleannieshop.backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String invoiceId;
    private String customerFullName;
    private String email;
    private String address;
    private String phoneNumber;
    private String payMethodOption;
    private Date dateCreated;
    /** Trạng thái đơn hàng: PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED */
    private String status;
    @OneToMany(mappedBy = "invoice")
    @JsonBackReference
    private List<InvoiceHasProduct> invoiceHasProducts;
    private double totalPrice;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}

package com.cleannieshop.backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "invoice")
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
    private String status;
    private double totalPrice;

    @OneToMany(mappedBy = "invoice", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<InvoiceHasProduct> invoiceHasProducts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}

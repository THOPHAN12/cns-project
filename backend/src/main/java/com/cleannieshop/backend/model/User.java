package com.cleannieshop.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    @Column(unique = true)
    private String username;
    private String role;
    private String password;
    private String fullName;
    private String email;
    private String phoneNumber;
    /** OAuth: GOOGLE hoặc FACEBOOK */
    private String authProvider;
    /** OAuth: ID người dùng từ Google/Facebook */
    private String authProviderId;
    

    @OneToOne(mappedBy = "user")
    @JsonManagedReference
    private Cart cart;

    @OneToOne(mappedBy = "user")
    @JsonManagedReference
    private Wishlist wishlist;

    @OneToMany(mappedBy = "user")
    private List<Invoice> invoices;
}

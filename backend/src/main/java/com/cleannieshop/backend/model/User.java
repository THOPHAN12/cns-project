package com.cleannieshop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    private String username;
    private String role;
    private String password;
    private String fullName;
    private String email;
    

    @OneToOne
    private Cart cartId;
}

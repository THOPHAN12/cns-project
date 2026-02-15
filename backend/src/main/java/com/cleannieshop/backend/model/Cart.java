package com.cleannieshop.backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.Data;

@Entity
@Table(name = "cart")
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cartId;
    private Date dateCreated;
    @OneToMany(mappedBy = "cart")
    @JsonBackReference
    private List<CartHasProduct> cartHasProducts;

    // public void addProductToCart(Product product) {
    //     products.add(product);
    // }

    // public void removeProductFromCart(Product product) {
    //     products.remove(product);
    // }
}

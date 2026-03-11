package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, String> {
}

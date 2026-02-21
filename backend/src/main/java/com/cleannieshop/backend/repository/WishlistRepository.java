package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.Wishlist;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, String> {

}

package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.Wishlist;
import java.util.List;


@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, String> {
    // List<Wishlist> findByUser(User user);
}

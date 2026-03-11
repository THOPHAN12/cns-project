package com.cleannieshop.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.BlogView;

public interface BlogViewRepository extends JpaRepository<BlogView, String> {
    Optional<BlogView> findBySlug(String slug);
}


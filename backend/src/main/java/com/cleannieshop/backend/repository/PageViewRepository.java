package com.cleannieshop.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.PageView;

public interface PageViewRepository extends JpaRepository<PageView, String> {
    Optional<PageView> findByPath(String path);
}

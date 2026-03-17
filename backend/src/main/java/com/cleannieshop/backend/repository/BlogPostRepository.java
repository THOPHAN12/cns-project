package com.cleannieshop.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.BlogPost;

public interface BlogPostRepository extends JpaRepository<BlogPost, String> {

    List<BlogPost> findByPublishDateLessThanEqualOrderByPublishDateDescCreatedAtDesc(LocalDate date);

    List<BlogPost> findAllByOrderByCreatedAtDesc();

    Optional<BlogPost> findBySlug(String slug);

    /** Bài đăng có publishDate trong khoảng [start, end] (bao gồm cả hai đầu). */
    List<BlogPost> findByPublishDateBetween(LocalDate start, LocalDate end);
}

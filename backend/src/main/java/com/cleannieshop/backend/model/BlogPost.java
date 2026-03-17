package com.cleannieshop.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "blog_posts")
@Data
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 512)
    private String slug;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 1000)
    private String excerpt;

    @Column(columnDefinition = "text")
    private String bodyHtml;

    @Column(length = 1024)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDate publishDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

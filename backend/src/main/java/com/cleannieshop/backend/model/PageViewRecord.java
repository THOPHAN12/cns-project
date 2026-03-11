package com.cleannieshop.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "page_view_records")
@Data
public class PageViewRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 500)
    private String path;

    @Column(nullable = false)
    private LocalDateTime viewedAt = LocalDateTime.now();

    @Column(length = 100)
    private String userId;

    @Column(length = 200)
    private String userName;
}

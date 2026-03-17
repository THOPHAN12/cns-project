package com.cleannieshop.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cleannieshop.backend.model.BlogPost;

import lombok.Data;

@Data
public class BlogPostDTO {
    private String id;
    private String slug;
    private String title;
    private String excerpt;
    private String bodyHtml;
    private String imageUrl;
    private LocalDate publishDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BlogPostDTO from(BlogPost p) {
        if (p == null) return null;
        BlogPostDTO dto = new BlogPostDTO();
        dto.setId(p.getId());
        dto.setSlug(p.getSlug());
        dto.setTitle(p.getTitle());
        dto.setExcerpt(p.getExcerpt());
        dto.setBodyHtml(p.getBodyHtml());
        dto.setImageUrl(p.getImageUrl());
        dto.setPublishDate(p.getPublishDate());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }
}

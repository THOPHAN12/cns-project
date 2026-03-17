package com.cleannieshop.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.BlogClickRequest;
import com.cleannieshop.backend.model.BlogView;
import com.cleannieshop.backend.service.BlogAnalyticsService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;

@RestController
@RequestMapping("api/blog")
@Tag(name = "Blog Analytics", description = "Thống kê lượt click / xem bài blog")
public class BlogAnalyticsController {

    @Autowired
    private BlogAnalyticsService blogAnalyticsService;

    @PostMapping("click")
    public ResponseEntity<Void> recordClick(@RequestBody BlogClickRequest req) {
        if (req == null || req.getSlug() == null || req.getSlug().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        blogAnalyticsService.recordClick(req.getSlug().trim());
        return ResponseEntity.ok().build();
    }

    @GetMapping("clicks")
    public ResponseEntity<List<BlogViewDTO>> getAll() {
        List<BlogViewDTO> list = blogAnalyticsService.getAll().stream()
                .map(BlogViewDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("clicks-by-slug")
    public ResponseEntity<BlogViewDTO> getBySlug(@RequestParam String slug) {
        long count = blogAnalyticsService.getClickCount(slug);
        BlogViewDTO dto = new BlogViewDTO();
        dto.setSlug(slug);
        dto.setClickCount(count);
        return ResponseEntity.ok(dto);
    }

    @Data
    public static class BlogViewDTO {
        private String id;
        private String slug;
        private long clickCount;

        public static BlogViewDTO fromEntity(BlogView v) {
            BlogViewDTO dto = new BlogViewDTO();
            dto.setId(v.getId());
            dto.setSlug(v.getSlug());
            dto.setClickCount(v.getClickCount());
            return dto;
        }
    }
}


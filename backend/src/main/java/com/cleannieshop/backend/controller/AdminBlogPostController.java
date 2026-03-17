package com.cleannieshop.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

import com.cleannieshop.backend.dto.BlogPostDTO;
import com.cleannieshop.backend.model.BlogPost;
import com.cleannieshop.backend.service.BlogPostService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/admin/blog/posts")
@Tag(name = "Admin Blog Posts", description = "CRUD bài blog (ADMIN)")
@PreAuthorize("hasRole('ADMIN')")
public class AdminBlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @GetMapping
    public ResponseEntity<List<BlogPostDTO>> listAll() {
        List<BlogPost> posts = blogPostService.findAll();
        return ResponseEntity.ok(posts.stream().map(BlogPostDTO::from).collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<BlogPostDTO> create(@RequestBody BlogPostDTO dto) {
        if (dto == null || dto.getTitle() == null || dto.getTitle().isBlank())
            return ResponseEntity.badRequest().build();
        BlogPost created = blogPostService.create(dto);
        return ResponseEntity.ok(BlogPostDTO.from(created));
    }

    @PatchMapping("{id}")
    public ResponseEntity<BlogPostDTO> update(@PathVariable String id, @RequestBody BlogPostDTO dto) {
        if (id == null || id.isBlank() || dto == null) return ResponseEntity.badRequest().build();
        BlogPost updated = blogPostService.update(id, dto);
        return updated != null ? ResponseEntity.ok(BlogPostDTO.from(updated)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return blogPostService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    /** Xóa tất cả bài đăng có publishDate trong khoảng from–to (query: from=yyyy-MM-dd&to=yyyy-MM-dd). */
    @DeleteMapping(params = { "from", "to" })
    public ResponseEntity<Map<String, Object>> deleteAllPublishedBetween(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        int deleted = blogPostService.deleteAllPublishedBetween(from, to);
        return ResponseEntity.ok(Map.of("deleted", deleted, "from", from.toString(), "to", to.toString()));
    }
}

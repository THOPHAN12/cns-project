package com.cleannieshop.backend.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.BlogPostDTO;
import com.cleannieshop.backend.model.BlogPost;
import com.cleannieshop.backend.service.BlogPostService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/blog/posts")
@Tag(name = "Blog Posts", description = "API danh sách và chi tiết bài blog (public)")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @GetMapping
    public ResponseEntity<List<BlogPostDTO>> listPublished() {
        List<BlogPost> posts = blogPostService.findPublished(LocalDate.now());
        return ResponseEntity.ok(posts.stream().map(BlogPostDTO::from).collect(Collectors.toList()));
    }

    @GetMapping("{slug}")
    public ResponseEntity<BlogPostDTO> getBySlug(@PathVariable String slug) {
        BlogPost post = blogPostService.findBySlug(slug);
        if (post == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(BlogPostDTO.from(post));
    }
}

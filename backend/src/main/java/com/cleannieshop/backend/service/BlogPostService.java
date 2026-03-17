package com.cleannieshop.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.dto.BlogPostDTO;
import com.cleannieshop.backend.model.BlogPost;
import com.cleannieshop.backend.repository.BlogPostRepository;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Transactional(readOnly = true)
    public List<BlogPost> findPublished(LocalDate upTo) {
        return blogPostRepository.findByPublishDateLessThanEqualOrderByPublishDateDescCreatedAtDesc(upTo);
    }

    @Transactional(readOnly = true)
    public List<BlogPost> findAll() {
        // Admin xem theo "ngăn xếp": bài tạo mới nhất nằm trên cùng
        return blogPostRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public BlogPost findBySlug(String slug) {
        return blogPostRepository.findBySlug(slug).orElse(null);
    }

    @Transactional(readOnly = true)
    public BlogPost findById(String id) {
        return blogPostRepository.findById(id).orElse(null);
    }

    @Transactional
    public BlogPost create(BlogPostDTO dto) {
        BlogPost post = new BlogPost();
        post.setSlug(normalizeSlug(dto.getSlug(), dto.getTitle()));
        post.setTitle(dto.getTitle() != null ? dto.getTitle().trim() : "");
        post.setExcerpt(dto.getExcerpt() != null ? dto.getExcerpt().trim() : null);
        post.setBodyHtml(dto.getBodyHtml() != null ? dto.getBodyHtml().trim() : null);
        post.setImageUrl(dto.getImageUrl() != null ? dto.getImageUrl().trim() : null);
        post.setPublishDate(dto.getPublishDate() != null ? dto.getPublishDate() : LocalDate.now());
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return blogPostRepository.save(post);
    }

    @Transactional
    public BlogPost update(String id, BlogPostDTO dto) {
        BlogPost post = blogPostRepository.findById(id).orElse(null);
        if (post == null) return null;
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) post.setSlug(dto.getSlug().trim());
        if (dto.getTitle() != null && !dto.getTitle().isBlank()) post.setTitle(dto.getTitle().trim());
        if (dto.getExcerpt() != null) post.setExcerpt(dto.getExcerpt().trim());
        if (dto.getBodyHtml() != null) post.setBodyHtml(dto.getBodyHtml().trim());
        if (dto.getImageUrl() != null) post.setImageUrl(dto.getImageUrl().trim());
        if (dto.getPublishDate() != null) post.setPublishDate(dto.getPublishDate());
        post.setUpdatedAt(LocalDateTime.now());
        return blogPostRepository.save(post);
    }

    @Transactional
    public boolean delete(String id) {
        if (id == null || !blogPostRepository.existsById(id)) return false;
        blogPostRepository.deleteById(id);
        return true;
    }

    /** Xóa tất cả bài đăng có publishDate từ from đến to (bao gồm cả hai ngày). Trả về số bài đã xóa. */
    @Transactional
    public int deleteAllPublishedBetween(LocalDate from, LocalDate to) {
        if (from == null || to == null || from.isAfter(to)) return 0;
        List<BlogPost> toDelete = blogPostRepository.findByPublishDateBetween(from, to);
        toDelete.forEach(blogPostRepository::delete);
        return toDelete.size();
    }

    private static String normalizeSlug(String slug, String title) {
        if (slug != null && !slug.isBlank()) return slug.trim();
        String base = title != null ? title.trim().toLowerCase() : "";
        base = base.replaceAll("[^a-z0-9\\s-]", "").replaceAll("\\s+", "-").replaceAll("-+", "-");
        if (base.isEmpty()) base = "post";
        return base + "-" + UUID.randomUUID().toString().substring(0, 8);
    }
}

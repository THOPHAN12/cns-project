package com.cleannieshop.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.model.BlogView;
import com.cleannieshop.backend.repository.BlogViewRepository;

@Service
public class BlogAnalyticsService {

    @Autowired
    private BlogViewRepository blogViewRepository;

    @Transactional
    public void recordClick(String slug) {
        if (slug == null || slug.isBlank()) {
            return;
        }
        BlogView view = blogViewRepository.findBySlug(slug).orElseGet(() -> {
            BlogView v = new BlogView();
            v.setSlug(slug);
            v.setClickCount(0L);
            return v;
        });
        view.setClickCount(view.getClickCount() + 1);
        blogViewRepository.save(view);
    }

    public long getClickCount(String slug) {
        if (slug == null || slug.isBlank()) {
            return 0L;
        }
        return blogViewRepository.findBySlug(slug)
                .map(BlogView::getClickCount)
                .orElse(0L);
    }

    public List<BlogView> getAll() {
        return blogViewRepository.findAll();
    }
}


package com.cleannieshop.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.model.PageView;
import com.cleannieshop.backend.repository.PageViewRepository;

@Service
public class PageViewService {

    @Autowired
    private PageViewRepository pageViewRepository;

    @Transactional
    public void recordView(String path) {
        if (path == null || path.isBlank()) {
            return;
        }
        final String normalized = path.trim().length() > 500 ? path.trim().substring(0, 500) : path.trim();
        PageView pv = pageViewRepository.findByPath(normalized).orElseGet(() -> {
            PageView v = new PageView();
            v.setPath(normalized);
            v.setViewCount(0L);
            return v;
        });
        pv.setViewCount(pv.getViewCount() + 1);
        pageViewRepository.save(pv);
    }

    public List<PageViewDTO> getAll() {
        return pageViewRepository.findAll().stream()
                .map(PageViewDTO::from)
                .collect(Collectors.toList());
    }

    public long getTotalViews() {
        return pageViewRepository.findAll().stream()
                .mapToLong(PageView::getViewCount)
                .sum();
    }

    public static class PageViewDTO {
        public String id;
        public String path;
        public long viewCount;

        public static PageViewDTO from(PageView pv) {
            PageViewDTO dto = new PageViewDTO();
            dto.id = pv.getId();
            dto.path = pv.getPath();
            dto.viewCount = pv.getViewCount();
            return dto;
        }
    }
}

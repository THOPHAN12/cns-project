package com.cleannieshop.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.model.PageView;
import com.cleannieshop.backend.model.PageViewRecord;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.repository.PageViewRecordRepository;
import com.cleannieshop.backend.repository.PageViewRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

@Service
public class PageViewRecordService {

    @Autowired
    private PageViewRecordRepository pageViewRecordRepository;

    @Autowired
    private PageViewRepository pageViewRepository;

    @Autowired
    private UserRepository userRepository;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @Transactional
    public void recordView(String path, String userId) {
        if (path == null || path.isBlank()) return;
        String normalized = path.trim().length() > 500 ? path.trim().substring(0, 500) : path.trim();

        LocalDateTime now = LocalDateTime.now();
        String userName = "Khách";
        if (userId != null && !userId.isBlank()) {
            userName = userRepository.findById(userId)
                    .map(u -> u.getFullName() != null && !u.getFullName().isBlank() ? u.getFullName() : u.getUsername())
                    .orElse("Khách");
        }

        PageViewRecord r = new PageViewRecord();
        r.setPath(normalized);
        r.setViewedAt(now);
        r.setUserId(userId);
        r.setUserName(userName);
        pageViewRecordRepository.save(r);

        PageView pv = pageViewRepository.findByPath(normalized).orElseGet(() -> {
            PageView v = new PageView();
            v.setPath(normalized);
            v.setViewCount(0L);
            return v;
        });
        pv.setViewCount(pv.getViewCount() + 1);
        pageViewRepository.save(pv);
    }

    public List<PageViewRecordDTO> getAllRecords() {
        List<PageViewRecordDTO> result = pageViewRecordRepository.findAllByOrderByViewedAtDesc().stream()
                .map(PageViewRecordDTO::from)
                .collect(Collectors.toList());
        if (result.isEmpty()) {
            for (PageView pv : pageViewRepository.findAll()) {
                for (long i = 0; i < pv.getViewCount(); i++) {
                    PageViewRecordDTO dto = new PageViewRecordDTO();
                    dto.id = pv.getId() + "-" + i;
                    dto.path = pv.getPath();
                    dto.viewedAt = "—";
                    dto.userId = null;
                    dto.userName = "Khách";
                    result.add(dto);
                }
            }
        }
        return result;
    }

    public long getTotalCount() {
        long fromRecords = pageViewRecordRepository.count();
        if (fromRecords > 0) return fromRecords;
        return pageViewRepository.findAll().stream().mapToLong(PageView::getViewCount).sum();
    }

    public static class PageViewRecordDTO {
        @JsonProperty("id") public String id;
        @JsonProperty("path") public String path;
        @JsonProperty("viewedAt") public String viewedAt;
        @JsonProperty("userId") public String userId;
        @JsonProperty("userName") public String userName;

        public static PageViewRecordDTO from(PageViewRecord r) {
            PageViewRecordDTO dto = new PageViewRecordDTO();
            dto.id = r.getId();
            dto.path = r.getPath();
            dto.viewedAt = r.getViewedAt() != null ? r.getViewedAt().format(FORMATTER) : "—";
            dto.userId = r.getUserId();
            dto.userName = r.getUserName() != null && !r.getUserName().isBlank() ? r.getUserName() : "Khách";
            return dto;
        }
    }
}

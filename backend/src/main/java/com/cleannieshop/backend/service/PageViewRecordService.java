package com.cleannieshop.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.model.PageViewRecord;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.repository.PageViewRecordRepository;
import com.cleannieshop.backend.repository.UserRepository;

@Service
public class PageViewRecordService {

    @Autowired
    private PageViewRecordRepository pageViewRecordRepository;

    @Autowired
    private UserRepository userRepository;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @Transactional
    public void recordView(String path, String userId) {
        if (path == null || path.isBlank()) return;
        String normalized = path.trim().length() > 500 ? path.trim().substring(0, 500) : path.trim();

        PageViewRecord r = new PageViewRecord();
        r.setPath(normalized);
        r.setViewedAt(LocalDateTime.now());
        r.setUserId(userId);
        if (userId != null && !userId.isBlank()) {
            userRepository.findById(userId).ifPresent(u -> {
                String name = u.getFullName() != null && !u.getFullName().isBlank()
                        ? u.getFullName() : u.getUsername();
                r.setUserName(name);
            });
        }
        pageViewRecordRepository.save(r);
    }

    public List<PageViewRecordDTO> getAllRecords() {
        return pageViewRecordRepository.findAllByOrderByViewedAtDesc().stream()
                .map(PageViewRecordDTO::from)
                .collect(Collectors.toList());
    }

    public long getTotalCount() {
        return pageViewRecordRepository.count();
    }

    public static class PageViewRecordDTO {
        public String id;
        public String path;
        public String viewedAt;
        public String userId;
        public String userName;

        public static PageViewRecordDTO from(PageViewRecord r) {
            PageViewRecordDTO dto = new PageViewRecordDTO();
            dto.id = r.getId();
            dto.path = r.getPath();
            dto.viewedAt = r.getViewedAt() != null ? r.getViewedAt().format(FORMATTER) : null;
            dto.userId = r.getUserId();
            dto.userName = r.getUserName() != null ? r.getUserName() : "Khách";
            return dto;
        }
    }
}

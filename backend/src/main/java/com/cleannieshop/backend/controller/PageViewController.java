package com.cleannieshop.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.service.PageViewRecordService;
import com.cleannieshop.backend.service.PageViewRecordService.PageViewRecordDTO;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/analytics")
@Tag(name = "Page Analytics", description = "Thống kê lượt truy cập trang web")
public class PageViewController {

    @Autowired
    private PageViewRecordService pageViewRecordService;

    @PostMapping("pageview")
    public ResponseEntity<Void> recordPageView(@RequestBody Map<String, Object> body) {
        String path = body != null && body.get("path") != null ? body.get("path").toString() : null;
        if (path == null || path.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        String userId = body != null && body.get("userId") != null ? body.get("userId").toString().trim() : null;
        if (userId != null && userId.isEmpty()) userId = null;
        pageViewRecordService.recordView(path, userId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping("pageviews")
    public ResponseEntity<List<PageViewRecordDTO>> getAllPageViewRecords() {
        return ResponseEntity.ok(pageViewRecordService.getAllRecords());
    }

    @GetMapping("pageviews/total")
    public ResponseEntity<Map<String, Long>> getTotalViews() {
        return ResponseEntity.ok(Map.of("total", pageViewRecordService.getTotalCount()));
    }
}

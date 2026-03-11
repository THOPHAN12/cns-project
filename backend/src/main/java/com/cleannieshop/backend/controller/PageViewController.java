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

import com.cleannieshop.backend.service.PageViewService;
import com.cleannieshop.backend.service.PageViewService.PageViewDTO;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/analytics")
@Tag(name = "Page Analytics", description = "Thống kê lượt truy cập trang web")
public class PageViewController {

    @Autowired
    private PageViewService pageViewService;

    @PostMapping("pageview")
    public ResponseEntity<Void> recordPageView(@RequestBody Map<String, String> body) {
        String path = body != null ? body.get("path") : null;
        if (path == null || path.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        pageViewService.recordView(path);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping("pageviews")
    public ResponseEntity<List<PageViewDTO>> getAllPageViews() {
        return ResponseEntity.ok(pageViewService.getAll());
    }

    @GetMapping("pageviews/total")
    public ResponseEntity<Map<String, Long>> getTotalViews() {
        return ResponseEntity.ok(Map.of("total", pageViewService.getTotalViews()));
    }
}

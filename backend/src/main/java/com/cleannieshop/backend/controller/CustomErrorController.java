package com.cleannieshop.backend.controller;

import java.util.Map;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CustomErrorController implements ErrorController {
    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int code = status != null ? Integer.parseInt(status.toString()) : 500;
        String msg = (String) request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        if (msg == null || msg.isEmpty()) {
            msg = HttpStatus.resolve(code) != null ? HttpStatus.resolve(code).getReasonPhrase() : "Error";
        }
        String path = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI) != null
                ? request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI).toString() : "";
        return ResponseEntity.status(code).body(Map.of("error", true, "status", code, "message", msg, "path", path));
    }
}

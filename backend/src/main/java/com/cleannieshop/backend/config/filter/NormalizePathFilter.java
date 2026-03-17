package com.cleannieshop.backend.config.filter;

import java.io.IOException;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequestWrapper;

/**
 * Chuẩn hóa path: bỏ dấu chấm hoặc slash thừa ở cuối (vd: /api/products. -> /api/products)
 * để tránh 404 khi client gửi URL có trailing dot.
 */
@Component
@Order(-1)
public class NormalizePathFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String uri = request.getRequestURI();
        if (uri != null && (uri.endsWith(".") || (uri.length() > 1 && uri.endsWith("/")))) {
            String normalized = uri.replaceAll("[./]+$", "");
            request = new HttpServletRequestWrapper(request) {
                @Override
                public String getRequestURI() {
                    return normalized;
                }
                @Override
                public String getServletPath() {
                    String sp = super.getServletPath();
                    if (sp != null && (sp.endsWith(".") || (sp.length() > 1 && sp.endsWith("/")))) {
                        return sp.replaceAll("[./]+$", "");
                    }
                    return sp;
                }
            };
        }
        filterChain.doFilter(request, response);
    }
}

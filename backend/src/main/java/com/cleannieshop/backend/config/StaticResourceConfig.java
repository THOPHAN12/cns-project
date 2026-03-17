package com.cleannieshop.backend.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve file uploads from disk.
        // Default: <project>/uploads -> /uploads/**
        Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        String location = uploadDir.toUri().toString(); // file:///...
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(location + "/")
                .setCachePeriod(3600);
    }
}


package com.cleannieshop.backend.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Locale;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cleannieshop.backend.dto.UploadResultDTO;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/admin/blog")
@Tag(name = "Admin Blog Upload", description = "Upload ảnh blog (ADMIN)")
public class AdminBlogUploadController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UploadResultDTO> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "publishDate", required = false) String publishDate,
            @RequestParam(value = "slug", required = false) String slug,
            @RequestParam(value = "token", required = false) String token,
            Authentication auth) throws IOException {

        // Some tunnels/proxies may strip Authorization for multipart uploads.
        // Accept token inside form-data as a fallback, but still enforce ADMIN.
        if (!isAdmin(auth) && !isAdminToken(token)) {
            return ResponseEntity.status(401).build();
        }

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        LocalDate date = LocalDate.now();
        if (publishDate != null && !publishDate.isBlank()) {
            try {
                date = LocalDate.parse(publishDate.trim());
            } catch (DateTimeParseException ignored) {
                // keep default
            }
        }

        String original = file.getOriginalFilename();
        String ext = getSafeExtension(original, file.getContentType());
        String baseName = UUID.randomUUID().toString().replace("-", "").substring(0, 12);

        // Auto folder structure: uploads/blog/YYYY/MM/DD/(slug)/file.ext
        Path root = Paths.get("uploads", "blog",
                String.format(Locale.ROOT, "%04d", date.getYear()),
                String.format(Locale.ROOT, "%02d", date.getMonthValue()),
                String.format(Locale.ROOT, "%02d", date.getDayOfMonth()))
                .toAbsolutePath()
                .normalize();
        if (slug != null && !slug.isBlank()) {
            String safeSlug = slug.trim().replaceAll("[^a-zA-Z0-9-_]", "-");
            if (!safeSlug.isBlank()) root = root.resolve(safeSlug);
        }
        Files.createDirectories(root);

        String filename = baseName + (ext != null ? ("." + ext) : "");
        Path dest = root.resolve(filename).normalize();
        if (!dest.startsWith(root)) {
            return ResponseEntity.badRequest().build();
        }
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, dest, StandardCopyOption.REPLACE_EXISTING);
        }

        // Public URL served by StaticResourceConfig
        String publicPath = dest.toString().replace("\\", "/");
        int idx = publicPath.indexOf("uploads/");
        String url = idx >= 0 ? ("/" + publicPath.substring(idx)) : ("/uploads/blog/" + filename);

        UploadResultDTO dto = new UploadResultDTO();
        dto.setUrl(url);
        dto.setPath(url);
        dto.setFilename(filename);
        dto.setSize(file.getSize());
        return ResponseEntity.ok(dto);
    }

    private static String getSafeExtension(String filename, String contentType) {
        String ext = null;
        if (filename != null) {
            String clean = StringUtils.cleanPath(filename);
            int dot = clean.lastIndexOf('.');
            if (dot >= 0 && dot < clean.length() - 1) {
                ext = clean.substring(dot + 1).toLowerCase(Locale.ROOT);
            }
        }
        if (ext == null || ext.isBlank()) {
            if (contentType != null) {
                String ct = contentType.toLowerCase(Locale.ROOT);
                if (ct.contains("png")) return "png";
                if (ct.contains("jpeg") || ct.contains("jpg")) return "jpg";
                if (ct.contains("webp")) return "webp";
                if (ct.contains("gif")) return "gif";
            }
            return null;
        }
        // Allowlist common image extensions only
        return switch (ext) {
            case "png", "jpg", "jpeg", "webp", "gif" -> (ext.equals("jpeg") ? "jpg" : ext);
            default -> null;
        };
    }

    private static boolean isAdmin(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) return false;
        for (GrantedAuthority ga : auth.getAuthorities()) {
            if (ga != null && "ROLE_ADMIN".equals(ga.getAuthority())) return true;
        }
        return false;
    }

    private boolean isAdminToken(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) return false;
        String t = rawToken.trim();
        if (t.toLowerCase(Locale.ROOT).startsWith("bearer ")) {
            t = t.substring(7).trim();
        }
        if (t.isBlank()) return false;
        try {
            String username = userService.extractUsername(t);
            if (username == null || username.isBlank()) return false;
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null || user.getRole() == null) return false;
            if (!"ADMIN".equalsIgnoreCase(user.getRole())) return false;
            return !userService.isTokenExpired(t);
        } catch (Exception e) {
            return false;
        }
    }
}


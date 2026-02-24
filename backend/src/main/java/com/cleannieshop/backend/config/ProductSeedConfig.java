package com.cleannieshop.backend.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.repository.ProductRepository;

/**
 * Seed sản phẩm HÌNH ẢNH SẢN PHẨM (Thời trang Nam/Nữ) vào database.
 * Chỉ thêm những sản phẩm chưa có (theo id) để thêm vào giỏ hoạt động.
 */
@Configuration
public class ProductSeedConfig {

    private static final Logger log = LoggerFactory.getLogger(ProductSeedConfig.class);
    private static final String IMG_BASE = "/images/products/HÌNH ẢNH SẢN PHẨM/HÌNH ẢNH SẢN PHẨM";
    private static final List<String> DEFAULT_SIZES = List.of("S", "M", "L");
    private static final long DEFAULT_STOCK = 100L;

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            List<Product> products = List.of(
                product("p-nu-1", "Black Top", 389000, IMG_BASE + "/THỜI TRANG NỮ/Black top.png", List.of("Nữ")),
                product("p-nu-2", "Blush Lift Bra", 319000, IMG_BASE + "/THỜI TRANG NỮ/Blush lift bra.JPG", List.of("Nữ")),
                product("p-nu-3", "Butter Set", 459000, IMG_BASE + "/THỜI TRANG NỮ/Butter set.JPG", List.of("Nữ")),
                product("p-nu-4", "Cemly Set", 429000, IMG_BASE + "/THỜI TRANG NỮ/Cemly set_.png", List.of("Nữ")),
                product("p-nu-5", "Contour Fit Short", 279000, IMG_BASE + "/THỜI TRANG NỮ/Contour fit short.JPG", List.of("Nữ")),
                product("p-nu-6", "Core High-Waist Legging", 349000, IMG_BASE + "/THỜI TRANG NỮ/Core high-waist legging .png", List.of("Nữ")),
                product("p-nu-7", "Dual Tone Sculpt Bra", 339000, IMG_BASE + "/THỜI TRANG NỮ/Dual tone sculpt bra.JPG", List.of("Nữ")),
                product("p-nu-8", "Emily Top", 299000, IMG_BASE + "/THỜI TRANG NỮ/Emily top.jpg", List.of("Nữ")),
                product("p-nu-9", "Second Top", 269000, IMG_BASE + "/THỜI TRANG NỮ/Second top.jpg", List.of("Nữ")),
                product("p-nu-10", "Soft Form Short", 309000, IMG_BASE + "/THỜI TRANG NỮ/Soft form short.png", List.of("Nữ")),
                product("p-nu-11", "Vanilla Sculpt Set", 499000, IMG_BASE + "/THỜI TRANG NỮ/Vanilla sculpt set.png", List.of("Nữ")),
                product("p-nam-1", "Campaign - Thời trang nam", 459000, IMG_BASE + "/THỜI TRANG NAM/Campaign.jpg", List.of("Nam")),
                product("p-nam-2", "Classic Zip Hoodie", 499000, IMG_BASE + "/THỜI TRANG NAM/Classic Zip Hoodie.jpg", List.of("Nam")),
                product("p-nam-3", "Essential Ribbed Tank Top – 3 Pack", 329000, IMG_BASE + "/THỜI TRANG NAM/Essential Ribbed Tank Top – 3 Pack.jpg", List.of("Nam")),
                product("p-nam-4", "Essential Long Sleeve T-Shirt", 349000, IMG_BASE + "/THỜI TRANG NAM/Essential Long Sleeve T-Shirt.jpg", List.of("Nam")),
                product("p-nam-5", "Essential Short Sleeve T-Shirt", 329000, IMG_BASE + "/THỜI TRANG NAM/Essential Short Sleeve T-Shirt.jpg", List.of("Nam")),
                product("p-nam-6", "Fleece Jogger Sweatpants", 449000, IMG_BASE + "/THỜI TRANG NAM/Fleece Jogger Sweatpants.jpg", List.of("Nam")),
                product("p-nam-7", "Lightweight Zip-Up Hoodie Set", 499000, IMG_BASE + "/THỜI TRANG NAM/Lightweight Zip-Up Hoodie Set.jpg", List.of("Nam")),
                product("p-nam-8", "Lightweight Zip-Up Hoodie Set (Variant)", 499000, IMG_BASE + "/THỜI TRANG NAM/Lightweight Zip-Up Hoodie Set(1).jpg", List.of("Nam")),
                product("p-nam-9", "Relaxed Fit Cotton T-Shirt", 299000, IMG_BASE + "/THỜI TRANG NAM/Relaxed Fit Cotton T-Shirt.jpg", List.of("Nam")),
                product("p-nam-10", "Relaxed Fit Lounge T-Shirt & Shorts Set", 429000, IMG_BASE + "/THỜI TRANG NAM/Relaxed Fit Lounge T-Shirt & Shorts Set.jpg", List.of("Nam")),
                product("p-nam-11", "Slim Fit Cotton Tank Top", 279000, IMG_BASE + "/THỜI TRANG NAM/Slim Fit Cotton Tank Top.jpg", List.of("Nam"))
            );
            int added = 0;
            for (Product p : products) {
                if (productRepository.findById(p.getId()).isEmpty()) {
                    try {
                        productRepository.save(p);
                        added++;
                    } catch (Exception e) {
                        log.warn("Seed product {} failed: {}", p.getId(), e.getMessage());
                    }
                }
            }
            if (added > 0) {
                log.info("Product seed: đã thêm {} sản phẩm vào hệ thống.", added);
            }
        };
    }

    private static Product product(String id, String name, double price, String imageSrc, List<String> categories) {
        Product p = new Product();
        p.setId(id);
        p.setProductName(name);
        p.setPrice(price);
        p.setImageSrc(imageSrc);
        p.setSizes(DEFAULT_SIZES);
        p.setStockQuantity(DEFAULT_STOCK);
        p.setCategories(categories);
        return p;
    }
}

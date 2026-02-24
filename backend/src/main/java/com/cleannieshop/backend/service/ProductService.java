package com.cleannieshop.backend.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.AddToCartDTO;
import com.cleannieshop.backend.dto.DeleteFromCartDTO;
import com.cleannieshop.backend.model.Cart;
import com.cleannieshop.backend.model.CartHasProduct;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.CartRepository;
import com.cleannieshop.backend.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartHasProductRepository cartHasProductRepository;

    @Transactional
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Transactional
    public List<Product> getProductsByFilter(List<String> filterStrings) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> result = allProducts.stream()
            .filter(e -> e.getCategories() != null && e.getCategories().containsAll(filterStrings))
            .toList();
        return result;
    }

    @Transactional
    public Product getProductById(String id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id).orElse(null);
    }

    /** Thêm 22 sản phẩm HÌNH ẢNH SẢN PHẨM vào DB nếu chưa có (theo id). Trả về số sản phẩm đã thêm. */
    @Transactional
    public int seedProductsIfMissing() {
        final String IMG = "/images/products/HÌNH ẢNH SẢN PHẨM/HÌNH ẢNH SẢN PHẨM";
        List<Product> list = List.of(
            product("p-nu-1", "Black Top", 389000, IMG + "/THỜI TRANG NỮ/Black top.png", List.of("Nữ")),
            product("p-nu-2", "Blush Lift Bra", 319000, IMG + "/THỜI TRANG NỮ/Blush lift bra.JPG", List.of("Nữ")),
            product("p-nu-3", "Butter Set", 459000, IMG + "/THỜI TRANG NỮ/Butter set.JPG", List.of("Nữ")),
            product("p-nu-4", "Cemly Set", 429000, IMG + "/THỜI TRANG NỮ/Cemly set_.png", List.of("Nữ")),
            product("p-nu-5", "Contour Fit Short", 279000, IMG + "/THỜI TRANG NỮ/Contour fit short.JPG", List.of("Nữ")),
            product("p-nu-6", "Core High-Waist Legging", 349000, IMG + "/THỜI TRANG NỮ/Core high-waist legging .png", List.of("Nữ")),
            product("p-nu-7", "Dual Tone Sculpt Bra", 339000, IMG + "/THỜI TRANG NỮ/Dual tone sculpt bra.JPG", List.of("Nữ")),
            product("p-nu-8", "Emily Top", 299000, IMG + "/THỜI TRANG NỮ/Emily top.jpg", List.of("Nữ")),
            product("p-nu-9", "Second Top", 269000, IMG + "/THỜI TRANG NỮ/Second top.jpg", List.of("Nữ")),
            product("p-nu-10", "Soft Form Short", 309000, IMG + "/THỜI TRANG NỮ/Soft form short.png", List.of("Nữ")),
            product("p-nu-11", "Vanilla Sculpt Set", 499000, IMG + "/THỜI TRANG NỮ/Vanilla sculpt set.png", List.of("Nữ")),
            product("p-nam-1", "Campaign - Thời trang nam", 459000, IMG + "/THỜI TRANG NAM/Campaign.jpg", List.of("Nam")),
            product("p-nam-2", "Classic Zip Hoodie", 499000, IMG + "/THỜI TRANG NAM/Classic Zip Hoodie.jpg", List.of("Nam")),
            product("p-nam-3", "Essential Ribbed Tank Top – 3 Pack", 329000, IMG + "/THỜI TRANG NAM/Essential Ribbed Tank Top – 3 Pack.jpg", List.of("Nam")),
            product("p-nam-4", "Essential Long Sleeve T-Shirt", 349000, IMG + "/THỜI TRANG NAM/Essential Long Sleeve T-Shirt.jpg", List.of("Nam")),
            product("p-nam-5", "Essential Short Sleeve T-Shirt", 329000, IMG + "/THỜI TRANG NAM/Essential Short Sleeve T-Shirt.jpg", List.of("Nam")),
            product("p-nam-6", "Fleece Jogger Sweatpants", 449000, IMG + "/THỜI TRANG NAM/Fleece Jogger Sweatpants.jpg", List.of("Nam")),
            product("p-nam-7", "Lightweight Zip-Up Hoodie Set", 499000, IMG + "/THỜI TRANG NAM/Lightweight Zip-Up Hoodie Set.jpg", List.of("Nam")),
            product("p-nam-8", "Lightweight Zip-Up Hoodie Set (Variant)", 499000, IMG + "/THỜI TRANG NAM/Lightweight Zip-Up Hoodie Set(1).jpg", List.of("Nam")),
            product("p-nam-9", "Relaxed Fit Cotton T-Shirt", 299000, IMG + "/THỜI TRANG NAM/Relaxed Fit Cotton T-Shirt.jpg", List.of("Nam")),
            product("p-nam-10", "Relaxed Fit Lounge T-Shirt & Shorts Set", 429000, IMG + "/THỜI TRANG NAM/Relaxed Fit Lounge T-Shirt & Shorts Set.jpg", List.of("Nam")),
            product("p-nam-11", "Slim Fit Cotton Tank Top", 279000, IMG + "/THỜI TRANG NAM/Slim Fit Cotton Tank Top.jpg", List.of("Nam"))
        );
        int added = 0;
        for (Product p : list) {
            if (productRepository.findById(p.getId()).isEmpty()) {
                productRepository.save(p);
                added++;
            }
        }
        return added;
    }

    private static Product product(String id, String name, double price, String imageSrc, List<String> categories) {
        Product p = new Product();
        p.setId(id);
        p.setProductName(name);
        p.setPrice(price);
        p.setImageSrc(imageSrc);
        p.setSizes(List.of("S", "M", "L"));
        p.setStockQuantity(100L);
        p.setCategories(categories);
        return p;
    }

    @Transactional
    public boolean addToCart(String id, AddToCartDTO addToCartDTO) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(addToCartDTO.getCartId()).orElse(null);
        if (cart == null) {
            return false;
        }
        // cart.addProductToCart(product);
        // cartRepository.save(cart);
        CartHasProductKey key = new CartHasProductKey(addToCartDTO.getCartId(), id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            cartHasProduct = new CartHasProduct(key, product, cart, addToCartDTO.getQuantity(), Arrays.asList(addToCartDTO.getSize()));
        } else {
            cartHasProduct.setQuantity(cartHasProduct.getQuantity() + addToCartDTO.getQuantity());
            for (int i=0; i<addToCartDTO.getQuantity(); i++) {
                cartHasProduct.getSizes().add(addToCartDTO.getSize());
            }
        }
        cartHasProductRepository.save(cartHasProduct);
        // product.setStockQuantity(product.getStockQuantity() - 1);
        // productRepository.save(product);
        return true;
    }


    @Transactional
    public boolean deleteFromCart(String id, DeleteFromCartDTO deleteFromCartDTO) {
        // TODO Auto-generated method stub
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }
        Cart cart = cartRepository.findById(deleteFromCartDTO.getCartId()).orElse(null);
        if (cart == null) {
            return false;
        }
        CartHasProductKey key = new CartHasProductKey(deleteFromCartDTO.getCartId(), id);
        CartHasProduct cartHasProduct = cartHasProductRepository.findById(key).orElse(null);
        if (cartHasProduct == null) {
            return false;
        } else {
            if (cartHasProduct.getQuantity() > 1){
                int remainingQuantity = cartHasProduct.getQuantity() - deleteFromCartDTO.getQuantity();
                if (remainingQuantity >= 1) {
                    cartHasProduct.setQuantity(remainingQuantity);
                    cartHasProductRepository.save(cartHasProduct);
                } else {
                    cartHasProductRepository.deleteById(key);
                }                
                
            }
            else 
                cartHasProductRepository.deleteById(key);
            // product.setStockQuantity(product.getStockQuantity() + 1);
            // productRepository.save(product);
            return true;
        }
    }
}

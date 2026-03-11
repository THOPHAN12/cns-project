package com.cleannieshop.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleannieshop.backend.dto.CartProductDTO;
import com.cleannieshop.backend.dto.InvoiceDetailDTO;
import com.cleannieshop.backend.dto.InvoiceItemDTO;
import com.cleannieshop.backend.dto.InvoiceRequestDTO;
import com.cleannieshop.backend.dto.InvoiceResponseDTO;
import com.cleannieshop.backend.model.Invoice;
import com.cleannieshop.backend.model.InvoiceHasProduct;
import com.cleannieshop.backend.model.Product;
import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.cleannieshop.backend.model.composite_keys.InvoiceHasProductKey;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.InvoiceHasProductRepository;
import com.cleannieshop.backend.repository.InvoiceRepository;
import com.cleannieshop.backend.repository.ProductRepository;
import com.cleannieshop.backend.repository.UserRepository;

@Service
public class InvoiceService {

    private static final String STATUS_PENDING = "PENDING";

    @Autowired
    private CartService cartService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private InvoiceHasProductRepository invoiceHasProductRepository;
    @Autowired
    private CartHasProductRepository cartHasProductRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public InvoiceResponseDTO createInvoice(InvoiceRequestDTO dto) {
        Invoice inv = new Invoice();
        inv.setCustomerFullName(dto.getCustomerFullName());
        inv.setEmail(dto.getEmail());
        inv.setPhoneNumber(dto.getPhoneNumber());
        inv.setAddress(dto.getAddress());
        inv.setPayMethodOption(dto.getPayMethodOption());
        inv.setDateCreated(new Date());
        inv.setTotalPrice(dto.getTotalPrice());
        inv.setStatus(STATUS_PENDING);
        if (dto.getUserId() != null && !dto.getUserId().isBlank()) {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            if (user != null) inv.setUser(user);
        }
        inv = invoiceRepository.save(inv);

        List<CartProductDTO> items = cartService.getAllProducts(dto.getCartId());
        for (CartProductDTO pdto : items) {
            Product product = productRepository.findById(pdto.getId()).orElse(null);
            if (product == null) return null;
            List<String> sizesToStore = pdto.getSizes();
            if (sizesToStore == null || sizesToStore.isEmpty()) {
                sizesToStore = new ArrayList<>();
                for (int i = 0; i < pdto.getQuantity(); i++) {
                    String fallback = (product.getSizes() != null && !product.getSizes().isEmpty())
                        ? product.getSizes().get(0) : "M";
                    sizesToStore.add(fallback);
                }
            }
            InvoiceHasProductKey key = new InvoiceHasProductKey(inv.getInvoiceId(), pdto.getId());
            InvoiceHasProduct ihp = new InvoiceHasProduct(key, inv, product, pdto.getQuantity(), sizesToStore);
            product.setStockQuantity(product.getStockQuantity() - ihp.getQuantity());
            invoiceHasProductRepository.save(ihp);
            cartHasProductRepository.deleteById(new CartHasProductKey(dto.getCartId(), pdto.getId()));
        }

        InvoiceResponseDTO res = new InvoiceResponseDTO();
        res.setInvoiceId(inv.getInvoiceId());
        res.setDateCreated(inv.getDateCreated());
        res.setTotalPrice(inv.getTotalPrice());
        return res;
    }

    @Transactional(readOnly = true)
    public List<InvoiceDetailDTO> getAllInvoices() {
        return invoiceRepository.findAllByOrderByDateCreatedDesc().stream().map(this::toDetailDTO).toList();
    }

    @Transactional(readOnly = true)
    public InvoiceDetailDTO getInvoiceById(String invoiceId) {
        Invoice inv = invoiceRepository.findById(invoiceId).orElse(null);
        return inv != null ? toDetailDTO(inv) : null;
    }

    @Transactional
    public InvoiceDetailDTO updateStatus(String invoiceId, String status) {
        Invoice inv = invoiceRepository.findById(invoiceId).orElse(null);
        if (inv == null) return null;
        inv.setStatus(status);
        invoiceRepository.save(inv);
        return toDetailDTO(inv);
    }

    @Transactional(readOnly = true)
    public List<InvoiceDetailDTO> getInvoicesByUserId(String userId) {
        return invoiceRepository.findByUser_UserIdOrderByDateCreatedDesc(userId).stream().map(this::toDetailDTO).toList();
    }

    private InvoiceDetailDTO toDetailDTO(Invoice inv) {
        InvoiceDetailDTO dto = new InvoiceDetailDTO();
        dto.setInvoiceId(inv.getInvoiceId());
        dto.setCustomerFullName(inv.getCustomerFullName());
        dto.setEmail(inv.getEmail());
        dto.setPhoneNumber(inv.getPhoneNumber());
        dto.setAddress(inv.getAddress());
        dto.setPayMethodOption(inv.getPayMethodOption());
        dto.setDateCreated(inv.getDateCreated());
        dto.setTotalPrice(inv.getTotalPrice());
        dto.setStatus(inv.getStatus() != null ? inv.getStatus() : STATUS_PENDING);
        if (inv.getUser() != null) dto.setUserId(inv.getUser().getUserId());
        List<InvoiceHasProduct> ihpList = invoiceHasProductRepository.findByInvoice(inv);
        if (ihpList != null && !ihpList.isEmpty()) {
            dto.setItems(ihpList.stream().map(ihp -> {
                InvoiceItemDTO item = new InvoiceItemDTO();
                item.setProductId(ihp.getProduct().getId());
                item.setProductName(ihp.getProduct().getProductName());
                item.setImageSrc(ihp.getProduct().getImageSrc());
                item.setPrice(ihp.getProduct().getPrice());
                item.setQuantity(ihp.getQuantity());
                item.setSizes(ihp.getSizes());
                String sizeDisplay = null;
                if (ihp.getSizes() != null && !ihp.getSizes().isEmpty()) {
                    for (String s : ihp.getSizes()) {
                        if (s != null && !s.trim().isEmpty()) {
                            sizeDisplay = s.trim();
                            break;
                        }
                    }
                }
                if (sizeDisplay == null && ihp.getProduct() != null && ihp.getProduct().getSizes() != null && !ihp.getProduct().getSizes().isEmpty()) {
                    sizeDisplay = ihp.getProduct().getSizes().get(0);
                }
                if (sizeDisplay == null) sizeDisplay = "M";
                item.setSize(sizeDisplay);
                return item;
            }).toList());
        }
        return dto;
    }
}

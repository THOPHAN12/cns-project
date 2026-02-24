package com.cleannieshop.backend.service;

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
import com.cleannieshop.backend.model.composite_keys.CartHasProductKey;
import com.cleannieshop.backend.model.composite_keys.InvoiceHasProductKey;
import com.cleannieshop.backend.repository.CartHasProductRepository;
import com.cleannieshop.backend.repository.InvoiceHasProductRepository;
import com.cleannieshop.backend.repository.InvoiceRepository;
import com.cleannieshop.backend.repository.ProductRepository;
import com.cleannieshop.backend.repository.UserRepository;
import com.cleannieshop.backend.model.User;

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

    public InvoiceResponseDTO createInvoice(InvoiceRequestDTO invoiceDTO) {
        // Create a new invoice instance
        Invoice invoice = new Invoice();
        invoice.setCustomerFullName(invoiceDTO.getCustomerFullName());
        invoice.setEmail(invoiceDTO.getEmail());
        invoice.setPhoneNumber(invoiceDTO.getPhoneNumber());
        invoice.setAddress(invoiceDTO.getAddress());
        invoice.setPayMethodOption(invoiceDTO.getPayMethodOption());
        invoice.setDateCreated(new Date());
        invoice.setTotalPrice(invoiceDTO.getTotalPrice());
        invoice.setStatus(STATUS_PENDING);
        if (invoiceDTO.getUserId() != null && !invoiceDTO.getUserId().isBlank()) {
            User user = userRepository.findById(invoiceDTO.getUserId()).orElse(null);
            if (user != null) invoice.setUser(user);
        }

        invoice = invoiceRepository.save(invoice);
        
        List<CartProductDTO> productDTOs = cartService.getAllProducts(invoiceDTO.getCartId());

        // Add all products to InvoiceHasProduct
        for (CartProductDTO productDTO : productDTOs) {
            InvoiceHasProductKey key = new InvoiceHasProductKey(invoice.getInvoiceId(), productDTO.getId());

            Product product = productRepository.findById(productDTO.getId()).orElse(null);
            if (product == null) {
                return null;
            }

            InvoiceHasProduct invoiceHasProduct = new InvoiceHasProduct(
                key, invoice, product, productDTO.getQuantity(), productDTO.getSizes()
            );

            product.setStockQuantity(product.getStockQuantity() - invoiceHasProduct.getQuantity());
            
            invoiceHasProductRepository.save(invoiceHasProduct);

            CartHasProductKey cartHasProductKey = new CartHasProductKey(invoiceDTO.getCartId(), productDTO.getId());
            cartHasProductRepository.deleteById(cartHasProductKey);
        }

        InvoiceResponseDTO responseDTO = new InvoiceResponseDTO();
        responseDTO.setInvoiceId(invoice.getInvoiceId());
        responseDTO.setDateCreated(invoice.getDateCreated());
        responseDTO.setTotalPrice(invoice.getTotalPrice());
        return responseDTO;
    }

    @Transactional(readOnly = true)
    public java.util.List<InvoiceDetailDTO> getAllInvoices() {
        List<Invoice> list = invoiceRepository.findAllByOrderByDateCreatedDesc();
        return list.stream().map(this::toDetailDTO).toList();
    }

    @Transactional(readOnly = true)
    public InvoiceDetailDTO getInvoiceById(String invoiceId) {
        Invoice inv = invoiceRepository.findById(invoiceId).orElse(null);
        return inv != null ? toDetailDTO(inv) : null;
    }

    public InvoiceDetailDTO updateStatus(String invoiceId, String status) {
        Invoice inv = invoiceRepository.findById(invoiceId).orElse(null);
        if (inv == null) return null;
        inv.setStatus(status);
        invoiceRepository.save(inv);
        return toDetailDTO(inv);
    }

    @Transactional(readOnly = true)
    public java.util.List<InvoiceDetailDTO> getInvoicesByUserId(String userId) {
        List<Invoice> list = invoiceRepository.findByUser_UserIdOrderByDateCreatedDesc(userId);
        return list.stream().map(this::toDetailDTO).toList();
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
        if (inv.getInvoiceHasProducts() != null) {
            dto.setItems(inv.getInvoiceHasProducts().stream().map(ihp -> {
                InvoiceItemDTO item = new InvoiceItemDTO();
                item.setProductId(ihp.getProduct().getId());
                item.setProductName(ihp.getProduct().getProductName());
                item.setImageSrc(ihp.getProduct().getImageSrc());
                item.setPrice(ihp.getProduct().getPrice());
                item.setQuantity(ihp.getQuantity());
                return item;
            }).toList());
        }
        return dto;
    }
}

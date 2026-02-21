package com.cleannieshop.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.dto.CartProductDTO;
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

@Service
public class InvoiceService {
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
}

package com.cleannieshop.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.InvoiceDetailDTO;
import com.cleannieshop.backend.dto.InvoiceRequestDTO;
import com.cleannieshop.backend.dto.InvoiceResponseDTO;
import com.cleannieshop.backend.service.InvoiceService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/invoice")
@Tag(name = "Invoice / Order Management", description = "API quản lý đơn hàng")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<InvoiceResponseDTO> createInvoice(@RequestBody InvoiceRequestDTO invoice) {
        InvoiceResponseDTO dto = invoiceService.createInvoice(invoice);
        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    /** Lấy tất cả đơn hàng (dành cho admin quản lý) */
    @GetMapping
    public ResponseEntity<List<InvoiceDetailDTO>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    /** Lấy chi tiết đơn hàng theo ID */
    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceDetailDTO> getInvoiceById(@PathVariable String invoiceId) {
        InvoiceDetailDTO dto = invoiceService.getInvoiceById(invoiceId);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    /** Cập nhật trạng thái đơn hàng. Body: { "status": "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED" } */
    @PatchMapping("/{invoiceId}/status")
    public ResponseEntity<InvoiceDetailDTO> updateStatus(
            @PathVariable String invoiceId,
            @RequestBody Map<String, String> body) {
        String status = body != null ? body.get("status") : null;
        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        InvoiceDetailDTO dto = invoiceService.updateStatus(invoiceId, status);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    /** Lịch sử đơn hàng của user */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InvoiceDetailDTO>> getInvoicesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByUserId(userId));
    }
}

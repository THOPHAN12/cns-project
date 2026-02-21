package com.cleannieshop.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleannieshop.backend.dto.InvoiceRequestDTO;
import com.cleannieshop.backend.dto.InvoiceResponseDTO;
import com.cleannieshop.backend.model.Invoice;
import com.cleannieshop.backend.service.InvoiceService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    @Tag(name = "Create Invoice", description = "Tạo hóa đơn khi khách hàng nhấn thanh toán")
    public ResponseEntity<InvoiceResponseDTO> createInvoice(@RequestBody InvoiceRequestDTO invoice) {
        //TODO: process POST request
        InvoiceResponseDTO dto = invoiceService.createInvoice(invoice);

        if (dto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    
}

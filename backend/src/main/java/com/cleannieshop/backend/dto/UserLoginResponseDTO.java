package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class UserLoginResponseDTO {
    private String token;
    private String userId;
}

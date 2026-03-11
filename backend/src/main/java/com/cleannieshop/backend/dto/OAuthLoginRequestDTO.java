package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class OAuthLoginRequestDTO {
    private String credential;
    private String accessToken;
}

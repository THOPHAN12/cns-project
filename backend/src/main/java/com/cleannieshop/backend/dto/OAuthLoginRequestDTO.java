package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class OAuthLoginRequestDTO {
    /** Google: credential (ID token). Facebook: accessToken */
    private String credential;
    private String accessToken;
}

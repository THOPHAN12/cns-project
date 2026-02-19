package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class UserRegisterDTO {
    private String fullName;
    private String email;
    private String username;
    private String password;
}

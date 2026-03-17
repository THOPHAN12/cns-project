package com.cleannieshop.backend.dto;

import lombok.Data;

@Data
public class UploadResultDTO {
    private String url;
    private String path;
    private String filename;
    private long size;
}


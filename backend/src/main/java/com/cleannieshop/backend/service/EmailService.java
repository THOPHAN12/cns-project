package com.cleannieshop.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender sender;

    public Boolean sendEmailTo(String email) {
        // TODO Auto-generated method stub
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@cleannieshop.com");
        message.setTo(email);
        message.setSubject("Lời mời tham gia chương trình");
        message.setText("Thư này được gửi nghĩa là bạn đã đăng ký tham gia chương trình. Mời bạn tham gia vào group cộng đồng!");

        sender.send(message);
        return true;
    }

    
}

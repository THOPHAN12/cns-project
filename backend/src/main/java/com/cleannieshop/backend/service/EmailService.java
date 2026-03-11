package com.cleannieshop.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public Boolean sendEmailTo(String email) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("noreply@cleannieshop.com");
        msg.setTo(email);
        msg.setSubject("Lời mời tham gia chương trình");
        msg.setText("Thư này được gửi nghĩa là bạn đã đăng ký tham gia chương trình. Mời bạn tham gia vào group cộng đồng!");
        mailSender.send(msg);
        return true;
    }
}

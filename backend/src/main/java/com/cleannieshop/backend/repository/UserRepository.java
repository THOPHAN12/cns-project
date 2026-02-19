package com.cleannieshop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.User;

public interface UserRepository extends JpaRepository<User, String>{
    
}

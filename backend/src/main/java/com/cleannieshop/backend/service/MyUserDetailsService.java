package com.cleannieshop.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cleannieshop.backend.model.User;
import com.cleannieshop.backend.model.UserPrincipal;
import com.cleannieshop.backend.repository.UserRepository;


@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        User user = userRepo.findById(username).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        return new UserPrincipal(user);
    }

}

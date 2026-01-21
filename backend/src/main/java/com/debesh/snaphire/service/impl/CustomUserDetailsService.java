package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.entity.User;
import com.debesh.snaphire.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Fetch our custom User entity from the DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // 2. CRITICAL STEP: Map the Role to an Authority
        // We use user.getRole().name() to get "RECRUITER" or "CANDIDATE"
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        // 3. We map our authority (RECRUITER) to a "GrantedAuthority" (ROLE_RECRUITER)
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(), // This is the hashed password from DB
                Collections.singletonList(authority)
        );
    }
}
package com.debesh.snaphire.controller;

import com.debesh.snaphire.model.AuthRequest;
import com.debesh.snaphire.model.AuthResponse;
import com.debesh.snaphire.entity.User; // Import your User entity
import com.debesh.snaphire.repository.UserRepository;
import com.debesh.snaphire.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {

        // 1. Authenticate
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        if (authentication.isAuthenticated()) {
            // 2. Fetch User to get the Role
            User user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // 3. Generate Token (Fix: Convert Enum to String)
            // We use .name() to turn Role.RECRUITER into "RECRUITER"
            String token = jwtUtil.generateToken(authRequest.getEmail(), user.getRole().name(), user.getId());

            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}
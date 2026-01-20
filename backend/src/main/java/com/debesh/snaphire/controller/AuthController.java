package com.debesh.snaphire.controller;

import com.debesh.snaphire.model.AuthRequest;
import com.debesh.snaphire.model.AuthResponse;
import com.debesh.snaphire.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {

        // 1. Authenticate (Checks if email & password match in DB)
        // If password is wrong, this line throws an exception automatically.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        // 2. If valid, generate the token
        String token = jwtUtil.generateToken(authRequest.getEmail());

        // 3. Return the token
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
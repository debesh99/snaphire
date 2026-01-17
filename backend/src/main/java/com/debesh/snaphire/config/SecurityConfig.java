package com.debesh.snaphire.config;

import com.debesh.snaphire.filter.JwtFilter;
import com.debesh.snaphire.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (We use tokens, not cookies, so this is safe to disable)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Define the "Rule Book" (Authorization)
                .authorizeHttpRequests(auth -> auth
                        // --- SWAGGER UI (Allow this publicly) ---
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        // --- PUBLIC ENDPOINTS (Everyone can visit) ---
                        .requestMatchers("/auth/**").permitAll()   // Login endpoint (we will build this next)
                        .requestMatchers(HttpMethod.POST, "/users").permitAll() // Signup endpoint

                        // --- RECRUITER ONLY ---
                        // Only recruiters can POST (create) jobs
                        .requestMatchers(HttpMethod.POST, "/jobs/**").hasRole("RECRUITER")
                        // Only recruiters can DELETE jobs
                        .requestMatchers(HttpMethod.DELETE, "/jobs/**").hasRole("RECRUITER")
                        // Only recruiters can see who applied
                        .requestMatchers("/applications/job/**").hasRole("RECRUITER")

                        // --- CANDIDATE ONLY ---
                        // Only candidates can apply
                        .requestMatchers("/applications/apply").hasRole("CANDIDATE")

                        // --- AUTHENTICATED (Both Roles) ---
                        // Both can view the job feed
                        .requestMatchers(HttpMethod.GET, "/jobs/**").authenticated()
                        // Any other link requires at least a valid token
                        .anyRequest().authenticated()
                )

                // 3. Stateless Session (Don't save cookies/session IDs)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 4. Set the Authentication Provider (Connects to DB)
                .authenticationProvider(authenticationProvider())

                // 5. Add our Door Guard (JwtFilter) BEFORE the standard login check
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // --- Helper Beans (Standard Boilerplate) ---

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encrypts passwords
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
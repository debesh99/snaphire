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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
                // 1. DISABLE CSRF (Crucial for Stateless APIs like this)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. ENABLE CORS (Uses the bean defined below)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. DEFINE RULES
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Allow Swagger UI (Optional but good to have)
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()

                        // PUBLIC ENDPOINTS (No Token Required)
                        .requestMatchers("/auth/**").permitAll()        // Login
                        .requestMatchers(HttpMethod.POST, "/users").permitAll() // Signup (Explicitly allow POST)

                        // RECRUITER ONLY
                        // Note: using hasAuthority matches the exact string in DB ("RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/jobs/**").hasAuthority("RECRUITER")
                        .requestMatchers(HttpMethod.DELETE, "/jobs/**").hasAuthority("RECRUITER")
                        .requestMatchers("/applications/job/**").hasAuthority("RECRUITER")

                        // CANDIDATE ONLY
                        .requestMatchers("/applications/apply").hasAuthority("CANDIDATE")

                        // ALL OTHER REQUESTS REQUIRE LOGIN
                        .anyRequest().authenticated()
                )

                // 4. STATELESS SESSION (No Cookies)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 5. ADD FILTERS
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

//    CORS Setup to allow frontend
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Allow the frontend URL
        configuration.setAllowedOriginPatterns(List.of("http://localhost:5173"));

        // Allow standard HTTP methods (GET, POST, etc.)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow headers (needed for sending tokens)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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
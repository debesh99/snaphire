package com.debesh.snaphire.repository;

import com.debesh.snaphire.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Check if email exists (useful for validation during signup)
    boolean existsByEmail(String email);
}

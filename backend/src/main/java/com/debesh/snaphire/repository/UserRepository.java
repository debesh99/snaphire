package com.debesh.snaphire.repository;

import com.debesh.snaphire.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Check if email exists (useful for validation during signup)
    boolean existsByEmail(String email);
}

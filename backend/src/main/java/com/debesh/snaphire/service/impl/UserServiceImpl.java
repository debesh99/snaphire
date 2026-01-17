package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.entity.User;
import com.debesh.snaphire.exception.UserNotFoundException;
import com.debesh.snaphire.repository.UserRepository;
import com.debesh.snaphire.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(User user) {
        // 1. Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            LOGGER.error("Creation failed. Email {} already exists.", user.getEmail());
            throw new RuntimeException("Email already exists!");
        }

        // 2. Save User
        // ENCRYPT PASSWORD BEFORE SAVING
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        LOGGER.info("User created successfully with ID: {}", savedUser.getId());
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundException("User with email {} not found"+email));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            LOGGER.error("Delete failed. User ID {} not found", id);
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(id);
        LOGGER.info("User with ID {} deleted successfully", id);
    }
}

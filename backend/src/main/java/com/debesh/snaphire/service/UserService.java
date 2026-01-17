package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.User;
import java.util.List;

public interface UserService {

    void createUser(User user);

    User getUserById(Long id);

    User getUserByEmail(String email); // Useful for login

    List<User> getAllUsers();

    void deleteUser(Long id);
}
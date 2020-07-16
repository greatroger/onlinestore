package com.example.onlinestore.dao;

import com.example.onlinestore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User,String> {
}

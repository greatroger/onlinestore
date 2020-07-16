package com.example.onlinestore.controller;

import com.example.onlinestore.dao.UserDAO;
import com.example.onlinestore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @className: UserController
 * @author: Yinan Cheng
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {
    @Autowired
    UserDAO userDAO;

    @GetMapping("users")
    public List<User> listCategory() throws Exception {
        List<User> users=userDAO.findAll();
        return users;
    }

    @PutMapping("login/{user_name}")
    public boolean login(@PathVariable("user_name") String user_name) throws Exception {
        User user=userDAO.getOne(user_name);
        user.setLog_state(1);
        userDAO.save(user);
        return true;
    }

    @PutMapping("logout/{user_name}")
    public boolean logout(@PathVariable("user_name") String user_name) throws Exception {
        User user=userDAO.getOne(user_name);
        user.setLog_state(0);
        userDAO.save(user);
        return true;
    }

    @PostMapping("register")
    public boolean addUser(@RequestBody User user) throws Exception {
        userDAO.save(user);
        return true;
    }
}

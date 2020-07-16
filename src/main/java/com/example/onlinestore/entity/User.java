package com.example.onlinestore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * @className: User
 * @author: Yinan Cheng
 */
@Entity
//@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Table(name = "user_")
public class User {
    @Id
    @Column(name = "user_name")
    private String user_name;

    @Column(name = "password")
    private String password;

    @Column(name = "log_state")
    private Integer log_state;

    public String getUser_name() {
        return user_name;
    }

    public Integer getLog_state() {
        return log_state;
    }

    public String getPassword() {
        return password;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLog_state(Integer log_state) {
        this.log_state = log_state;
    }
}

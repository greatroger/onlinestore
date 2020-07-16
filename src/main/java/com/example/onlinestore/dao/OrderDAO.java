package com.example.onlinestore.dao;

import com.example.onlinestore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface OrderDAO extends JpaRepository<Order,Integer> {
    @Query(nativeQuery = true, value ="select * from order_ where user_name=:user_name and order_state=:order_state")
    List getOrderByUser(@PathVariable("user_name")String user_name, @PathVariable("order_state") Integer order_state);
}

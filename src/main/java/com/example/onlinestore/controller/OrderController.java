package com.example.onlinestore.controller;

import com.example.onlinestore.dao.OrderDAO;
import com.example.onlinestore.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * @className: OrderController
 * @author: Yinan Cheng
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class OrderController {
    @Autowired
    OrderDAO orderDAO;

    @GetMapping("orders")
    public List<Order> listCategory() throws Exception {
        List<Order> orders=orderDAO.findAll();
        return orders;
    }

    //添加购物车或下订单(order_state为0代表购物车，为1代表直接下单)
    @PostMapping("addOrder")
    public boolean addOrder(@RequestBody Order order) throws Exception {
        String time_str=Order.testTimestampToString();
        order.setOrder_time(time_str);
        orderDAO.save(order);
        return true;
    }

    //通过购物车下单
    @PutMapping("payOrder/{order_id}/{item_num}")
    public boolean payOrder(@PathVariable("order_id") Integer order_id,@PathVariable("item_num") Integer item_num) throws Exception {
        Order order=orderDAO.getOne(order_id);
        order.setOrder_state(1);
        order.setItem_num(item_num);
        String time_str=Order.testTimestampToString();
        order.setOrder_time(time_str);
        orderDAO.save(order);
        return true;
    }

    @GetMapping("getOrder/{user_name}/{order_state}")
    public List<Order> getOrder(@PathVariable("user_name") String user_name, @PathVariable("order_state") Integer order_state) throws Exception {
        List<Order> orderList=orderDAO.getOrderByUser(user_name,order_state);
        return orderList;
    }

    @DeleteMapping("deleteCart/{order_id}")
    public boolean deleteCart(@PathVariable("order_id") Integer order_id) throws Exception {
        Order order=orderDAO.getOne(order_id);
        orderDAO.delete(order);
        return true;
    }

}

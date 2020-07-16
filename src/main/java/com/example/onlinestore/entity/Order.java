package com.example.onlinestore.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * @className: Order
 * @author: Yinan Cheng
 */
@Entity
//@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Table(name = "order_")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer order_id;

    @Column(name = "user_name")
    private String user_name;

    @Column(name = "order_time")
    private String order_time;

    @Column(name = "order_state")
    private Integer order_state;

    @Column(name = "item_id")
    private Integer item_id;

    @Column(name = "item_num")
    private Integer item_num;

    public Integer getOrder_id() {
        return order_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getOrder_time() {
        return order_time;
    }

    public Integer getOrder_state() {
        return order_state;
    }

    public Integer getItem_id() {
        return item_id;
    }

    public Integer getItem_num() {
        return item_num;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public void setOrder_time(String order_time) {
        this.order_time = order_time;
    }

    public void setOrder_state(Integer order_state) {
        this.order_state = order_state;
    }

    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

    public void setItem_num(Integer item_num) {
        this.item_num = item_num;
    }

    public static String testTimestampToString() {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //方法一:优势在于可以灵活的设置字符串的形式。
        String tsStr = sdf.format(ts);
        System.out.println(tsStr);  // 2017-01-15 21:17:04
        return tsStr;
    }
}

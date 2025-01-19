package org.example.backend.controllers;

import lombok.AllArgsConstructor;
import org.example.backend.dtos.AddressDto;
import org.example.backend.entities.Order;
import org.example.backend.entities.OrderedProduct;
import org.example.backend.entities.Product;
import org.example.backend.services.OrderService;
import org.example.backend.utils.OrderedProductsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/user/setaddress")
    public ResponseEntity<Integer> setAddress(@Validated @RequestBody AddressDto addressDto){
        return orderService.setAddress(addressDto);
    }

    @PostMapping("/user/setorder/{id}")
    public ResponseEntity<Void> setOrder(@RequestBody Map<Integer, Integer> products, @PathVariable("id") int addressId){
        orderService.setOrder(products, addressId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/getallorders")
    public ResponseEntity<List<Order>> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/user/get/{id}")
    public ResponseEntity<List<OrderedProductsResponse>> getOrder(@PathVariable("id") int id) throws AccessDeniedException {
        return orderService.getOrder(id);
    }
}

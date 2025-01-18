package org.example.backend.controllers;

import lombok.AllArgsConstructor;
import org.example.backend.dtos.AddressDto;
import org.example.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
}

package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.dtos.AddressDto;
import org.example.backend.entities.*;
import org.example.backend.repositories.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class OrderService {

    private final AddressRepository addressRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderedProductRepository orderedProductRepository;

    public ResponseEntity<Integer> setAddress(AddressDto addressDto){
        Address address = new Address();
        address.setAddressLine(addressDto.getAddressLine());
        address.setAddressLine2(addressDto.getAddressLine2());
        address.setZipCode(addressDto.getZipCode());
        address.setCity(addressDto.getCity());
        address.setCountry(addressDto.getCountry());

        addressRepository.save(address);
        int addressId = address.getId();
        System.out.println(addressId);

        return ResponseEntity.ok(addressId);
    }

    public ResponseEntity<Void> setOrder(Map<Integer, Integer> products, int addressId){
        LocalDateTime localDateTime = LocalDateTime.now();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));

        Address address = addressRepository.findAddressById(addressId)
                .orElseThrow(() -> new NoSuchElementException("address not found"));

        List<OrderedProduct> orderedProductList = new ArrayList<>();
        Order order = new Order();
        order.setAddress(address);
        order.setUser(user);
        order.setDate(localDateTime);

        double totalSummary = 0.;

        Map<Integer, Integer> orderedProducts = products;

        for (Map.Entry<Integer, Integer> entry : orderedProducts.entrySet()) {
            int productId = entry.getKey();
            int quantity = entry.getValue();

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new NoSuchElementException(""));

            totalSummary += product.getPrice() * quantity;

            OrderedProduct orderedProduct = new OrderedProduct();
            orderedProduct.setProduct(product);
            orderedProduct.setQuantity(quantity);
            orderedProduct.setOrder(order);

            orderedProductList.add(orderedProduct);
        }

        order.setTotalSummary(totalSummary);
        order.setOrderedProducts(orderedProductList);

        orderRepository.save(order);
        orderedProductRepository.saveAll(orderedProductList);

        return ResponseEntity.ok().build();
    }
}

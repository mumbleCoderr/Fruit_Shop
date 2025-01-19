package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.dtos.AddressDto;
import org.example.backend.entities.*;
import org.example.backend.repositories.*;
import org.example.backend.utils.OrderedProductsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.*;

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

        totalSummary = Math.round(totalSummary * 100.0) / 100.0;
        order.setTotalSummary(totalSummary);
        order.setOrderedProducts(orderedProductList);

        orderRepository.save(order);
        orderedProductRepository.saveAll(orderedProductList);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<List<Order>> getAllOrders(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));

        List<Order> orders = orderRepository.getAllByUser(user)
                .orElseThrow(() -> new NoSuchElementException("no orders found"));

        return ResponseEntity.ok(orders);
    }

    public ResponseEntity<List<OrderedProductsResponse>> getOrder(int id) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("order not found"));

        if (order.getUser().getId() != user.getId()) throw new AccessDeniedException("");

        List<OrderedProduct> orderedProductList = orderedProductRepository.findByOrder(order)
                .orElseThrow(() -> new NoSuchElementException("no ordered products found"));

        List<OrderedProductsResponse> response = new ArrayList<>();


        orderedProductList.forEach(o -> {
            Product product = productRepository.findById(o.getProduct().getId())
                            .orElseThrow(() -> new NoSuchElementException("product not found"));

            OrderedProductsResponse opr = new OrderedProductsResponse();
            opr.setName(product.getName());
            opr.setPrice(product.getPrice());
            opr.setImg(product.getImg());
            opr.setOrderedQuantity(o.getQuantity());
            double priceForProduct = product.getPrice() * o.getQuantity();
            opr.setPriceForProduct(Math.round(priceForProduct * 100.0) / 100.0);
            response.add(opr);
        });

        return ResponseEntity.ok(response);
    }
}

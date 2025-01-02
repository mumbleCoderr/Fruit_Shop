package org.example.backend;

import org.example.backend.entities.Product;
import org.example.backend.repositories.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class BackendApplicationTests {

    private static ProductRepository productRepository;
    @Autowired
    public BackendApplicationTests(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Test
    void contextLoads() {
        List<Product> products = productRepository.findAll();
        products.forEach(System.out::println);
    }

}

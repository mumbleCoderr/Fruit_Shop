package org.example.backend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.entities.Product;
import org.example.backend.repositories.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/getall")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        productRepository.save(product);
        return product;
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") int id){
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(null);

        return ResponseEntity.ok(product.get());
    }
}

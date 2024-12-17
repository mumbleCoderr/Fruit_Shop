package org.example.backend.services;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.entities.Product;
import org.example.backend.repositories.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    public Product addProduct(Product product){
        return productRepository.save(product);
    }
    public ResponseEntity<Product> getProduct(int id){
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).body(null);

        return ResponseEntity.ok(product.get());
    }
}

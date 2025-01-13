package org.example.backend.services;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.example.backend.entities.Product;
import org.example.backend.repositories.ProductRepository;
import org.hibernate.query.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.management.ConstructorParameters;
import javax.naming.NameNotFoundException;
import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final int productsOnPage = 5;

    public ResponseEntity<Integer> getTotalPages(){
        long productsQuantity = productRepository.count();
        int totalPages = (int) productsQuantity / productsOnPage + 1;

        return ResponseEntity.ok(totalPages);
    }
    public ResponseEntity<List<Product>> getAllProducts(int page){
        Sort sort = Sort.by("name");

        List<Product> products = productRepository.findAll(PageRequest.of(page, productsOnPage, sort)).getContent();

        return ResponseEntity.ok()
                .body(products);
    }

    public ResponseEntity<Product> getProduct(int id) throws NameNotFoundException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NameNotFoundException());

        return ResponseEntity.ok(product);
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }
}

package org.example.backend.controllers;

import org.example.backend.entities.Product;
import org.example.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getall")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") int id){
        return productService.getProduct(id);
    }
}

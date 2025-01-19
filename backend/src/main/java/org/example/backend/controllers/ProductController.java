package org.example.backend.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.backend.entities.Product;
import org.example.backend.services.ProductService;
import org.hibernate.query.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.naming.NameNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;


    @GetMapping("/noauthority/totalpages")
    public ResponseEntity<Integer> getTotalPages(){
        return productService.getTotalPages();
    }

    @GetMapping("/noauthority/getall/{page}")
    public ResponseEntity<List<Product>> getAllProducts(@PathVariable("page") int page){
        return productService.getAllProducts(page);
    }
    @GetMapping("/noauthority/get/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") int id) throws NameNotFoundException {
        return productService.getProduct(id);
    }

    @PostMapping("/admin/add")
    public Product addProduct(@Validated @RequestBody Product product){
        return productService.addProduct(product);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") int id){
        return productService.deleteProduct(id);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}

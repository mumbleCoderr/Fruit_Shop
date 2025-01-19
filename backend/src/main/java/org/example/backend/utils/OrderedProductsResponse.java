package org.example.backend.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.entities.OrderedProduct;

import java.util.List;

@Getter
@Setter
public class OrderedProductsResponse {

    private String name;

    private double price;

    private String img;

    private int orderedQuantity;

    private double priceForProduct;
}

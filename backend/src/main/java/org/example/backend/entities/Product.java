package org.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "name field is mandatory")
    private String name;

    @Min(value = 0, message = "price has to be higher than 0")
    private double price;

    @Min(value = 1, message = "quantity has to be higher than 0")
    private int quantity;

    @NotBlank(message = "img field is mandatory")
    private String img;
}

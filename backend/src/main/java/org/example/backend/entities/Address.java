package org.example.backend.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(min = 1, max = 100)
    @Column(name = "address_line")
    private String addressLine;

    @Size(max = 100)
    @Nullable
    @Column(name = "address_line_2")
    private String addressLine2;

    @Size(min = 1, max = 50)
    @Column(name = "zip_code")
    private String zipCode;

    @Size(min = 1, max = 100)
    private String city;

    @Size(min = 1, max = 100)
    private String country;
}

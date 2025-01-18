package org.example.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @Column(name = "address_id")
    private Address address;

    @ManyToOne
    @Column(name = "user_id")
    private User user;

    LocalDateTime localDateTime;

    @OneToMany(mappedBy = "order")
    private List<OrderedProduct> orderedProducts;
}

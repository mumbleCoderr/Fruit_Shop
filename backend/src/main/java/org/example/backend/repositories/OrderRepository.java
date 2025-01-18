package org.example.backend.repositories;

import org.example.backend.entities.Order;
import org.example.backend.entities.OrderedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(
            """
                SELECT o
                FROM Order o
                WHERE o.id = :id
            """
    )
    Optional<Order> findById(int id);
}

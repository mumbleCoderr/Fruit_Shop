package org.example.backend.repositories;

import org.example.backend.entities.Order;
import org.example.backend.entities.OrderedProduct;
import org.example.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, Integer> {

    @Query(
            """
                SELECT o
                FROM OrderedProduct o
                WHERE o.order = :order
            """
    )
    Optional<List<OrderedProduct>> findByOrder(Order order);
}

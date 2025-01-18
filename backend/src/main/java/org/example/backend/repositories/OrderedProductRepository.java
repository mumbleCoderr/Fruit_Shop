package org.example.backend.repositories;

import org.example.backend.entities.OrderedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, Integer> {

}

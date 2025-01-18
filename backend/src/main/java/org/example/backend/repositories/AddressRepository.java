package org.example.backend.repositories;

import org.example.backend.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Query(
            """
                SELECT a 
                FROM Address a
                WHERE a.id = :id
            """
    )
    Optional<Address> findAddressById(int id);
}

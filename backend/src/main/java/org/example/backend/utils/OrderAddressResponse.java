package org.example.backend.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderAddressResponse {
    private String userName;

    private String addressLine;

    private String addressLine2;

    private String zipCode;

    private String city;

    private String country;
}

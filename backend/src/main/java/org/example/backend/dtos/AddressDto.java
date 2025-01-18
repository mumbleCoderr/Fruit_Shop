package org.example.backend.dtos;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {

    @Size(min = 1, max = 100)
    private String addressLine;

    @Size(max = 100)
    private String addressLine2;

    @Size(min = 1, max = 50)
    private String zipCode;

    @Size(min = 1, max = 100)
    private String city;

    @Size(min = 1, max = 100)
    private String country;
}

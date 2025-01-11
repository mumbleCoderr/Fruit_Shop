package org.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterUserDto {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
}

package org.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPasswordDto {
    private String oldPassword;
    private String newPassword;
}

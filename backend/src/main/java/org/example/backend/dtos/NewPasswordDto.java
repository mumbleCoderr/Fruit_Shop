package org.example.backend.dtos;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPasswordDto {

    private String oldPassword;

    @Size(min = 10)
    private String newPassword;
}

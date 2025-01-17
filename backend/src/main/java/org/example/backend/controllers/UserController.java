package org.example.backend.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.backend.dtos.NewPasswordDto;
import org.example.backend.entities.User;
import org.example.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/authority")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/changepassword")
    public ResponseEntity<Void> changePassword(@Validated @RequestBody NewPasswordDto newPasswordDto) throws Exception {
        return userService.changePassword(newPasswordDto);
    }
}

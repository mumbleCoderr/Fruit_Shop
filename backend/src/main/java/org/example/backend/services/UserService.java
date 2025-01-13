package org.example.backend.services;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.example.backend.dtos.NewPasswordDto;
import org.example.backend.entities.User;
import org.example.backend.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<Void> changePassword(NewPasswordDto newPasswordDto) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new BadCredentialsException(""));

        if (!passwordEncoder.matches(newPasswordDto.getOldPassword(), user.getPassword()))
            throw new BadCredentialsException("");

        if (passwordEncoder.matches(newPasswordDto.getNewPassword(), user.getPassword()))
            throw new Exception("new password has to be different");

        user.setPassword(passwordEncoder.encode(newPasswordDto.getNewPassword()));

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
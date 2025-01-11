package org.example.backend.services;


import lombok.AllArgsConstructor;
import org.example.backend.dtos.LoginUserDto;
import org.example.backend.dtos.RegisterUserDto;
import org.example.backend.entities.User;
import org.example.backend.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setName(input.getName());
        user.setSurname(input.getSurname());
        user.setPhoneNumber(input.getPhoneNumber());

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findUserByUsername(input.getUsername())
                .orElseThrow();
    }
}
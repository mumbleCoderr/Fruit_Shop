package org.example.backend.security;

import lombok.AllArgsConstructor;
import org.example.backend.entities.Authority;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
public class SecurityAuthority implements GrantedAuthority {

    private final Authority authority;

    @Override
    public String getAuthority() {
        return authority.getName();
    }
}

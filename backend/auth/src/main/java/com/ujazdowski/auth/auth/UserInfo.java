package com.ujazdowski.auth.auth;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.IDToken;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class UserInfo {

    private final String username;
    private String surname;
    private String name;
    private String email;
    private final Collection<String> roles;
    private final Map<String, Object> props = new HashMap<>();

    public UserInfo(KeycloakAuthenticationToken authenticationToken) {
        this.username = authenticationToken.getName();
        this.roles = authenticationToken.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
        Principal principal = (Principal) authenticationToken.getPrincipal();

        if (principal instanceof KeycloakPrincipal) {
            KeycloakPrincipal kPrincipal = (KeycloakPrincipal) principal;
            IDToken token = kPrincipal.getKeycloakSecurityContext().getToken();

            token.getOtherClaims().forEach(this::addProperty);
            this.email = token.getEmail();
            this.name = token.getGivenName();
            this.surname = token.getFamilyName();
        }
    }

    private void addProperty(String key, Object value) {
        props.put(key, value);
    }

    public String getUsername() {
        return username;
    }

    public Collection<String> getRoles() {
        return roles;
    }

    public Map<String, Object> getProps() {
        return props;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

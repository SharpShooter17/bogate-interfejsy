package com.ujazdowski.auth.api;

import com.ujazdowski.auth.auth.AuthorizationService;
import com.ujazdowski.auth.auth.KeycloakLogoutController;
import com.ujazdowski.auth.auth.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController()
@RequestMapping("/api/auth")
public class AuthController {

    private final KeycloakLogoutController logoutController;
    private final AuthorizationService service;

    public AuthController(KeycloakLogoutController logoutController,
                          AuthorizationService service) {
        this.logoutController = logoutController;
        this.service = service;
    }

    @PostMapping("/logout")
    public void logout(@Autowired HttpServletRequest request) throws ServletException {
        logoutController.logout(request);
    }

    @GetMapping("/user-info")
    public UserInfo userInfo() {
        return service.userInfo();
    }
}

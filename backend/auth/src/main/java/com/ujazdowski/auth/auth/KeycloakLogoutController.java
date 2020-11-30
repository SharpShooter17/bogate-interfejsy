package com.ujazdowski.auth.auth;

import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@Controller
public class KeycloakLogoutController {

    public void logout(HttpServletRequest request) throws ServletException {
        request.logout();
    }

}

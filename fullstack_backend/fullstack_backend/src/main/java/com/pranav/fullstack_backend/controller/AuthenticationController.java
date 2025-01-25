package com.pranav.fullstack_backend.controller;

import com.pranav.fullstack_backend.auth.AuthenticationRequest;
import com.pranav.fullstack_backend.auth.AuthenticationResponse;
import com.pranav.fullstack_backend.auth.GoogleSSORequest;
import com.pranav.fullstack_backend.auth.service.LogoutService;
import com.pranav.fullstack_backend.auth.service.AuthenticationService;
import com.pranav.fullstack_backend.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/v1/auth/full")
//@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final LogoutService logoutService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/googleSSOAuthenticate")
    public ResponseEntity<AuthenticationResponse> googleSSOAuthenticate(
            @RequestBody GoogleSSORequest request
            ) throws GeneralSecurityException, IOException {
        return ResponseEntity.ok(service.googleSSOAuthenticate(request));
    }

    @GetMapping("/empLogout")
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        logoutService.logout(request, response, authentication);
    }

}

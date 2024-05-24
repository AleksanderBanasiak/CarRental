package com.banasiak.carRental.controller;

import com.banasiak.carRental.dto.AuthRequest;
import com.banasiak.carRental.dto.AuthResponse;
import com.banasiak.carRental.dto.RegistrationRequest;
import com.banasiak.carRental.service.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    @ResponseStatus(ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthRequest authRequest){
        return ResponseEntity.ok(authenticationService.authenticate(authRequest));
    }

    @GetMapping("/activate-account")
    public void activate(@RequestParam String token) throws MessagingException {
        authenticationService.activateAccount(token);
    }


}

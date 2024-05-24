package com.banasiak.carRental.service;

import com.banasiak.carRental.dto.AuthRequest;
import com.banasiak.carRental.dto.AuthResponse;
import com.banasiak.carRental.dto.RegistrationRequest;
import com.banasiak.carRental.model.EmailTemplateName;
import com.banasiak.carRental.model.Role;
import com.banasiak.carRental.model.Token;
import com.banasiak.carRental.model.User;
import com.banasiak.carRental.repo.RoleRepo;
import com.banasiak.carRental.repo.TokenRepo;
import com.banasiak.carRental.repo.UserRepo;
import com.banasiak.carRental.security.JwtService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import static java.time.LocalDateTime.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final TokenRepo tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        Role role = roleRepo.findByName("USER").orElseThrow(()-> new IllegalArgumentException("Role not found"));

        User user = User.builder()
                .email(request.email())
                .name(request.name())
                .password(passwordEncoder.encode(request.password()))
                .accountLocked(false)
                .enable(false)
                .roles(List.of(role))
                .build();
        userRepo.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        String token = generateAndSaveNewToken(user);

        emailService.sendEmail(
             user.getEmail(),
             user.getName(),
             EmailTemplateName.ACTIVATE_ACCOUNT,
             activationUrl,
             token,
             "Account activation"
        );
    }

    private String generateAndSaveNewToken(User user) {

        String generateActivationCode = generateActivationCode();

        Token token = Token.builder()
                .token(generateActivationCode)
                .createdAt(now())
                .expiresAt(now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepo.save(token);
        return generateActivationCode;
    }

    private String generateActivationCode() {

        StringBuilder sb = new StringBuilder();
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    public AuthResponse authenticate(AuthRequest authRequest) {

        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.email(),
                authRequest.password()
        ));

        var claims = new HashMap<String, Object>();
        User user = (User) auth.getPrincipal();
        claims.put("name", user.getName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthResponse.builder().token(jwtToken).build();
    }

    public void activateAccount(String token) throws MessagingException {

        Token savedToken = tokenRepo.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));

        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Token has expired, new token has been send to your email");
        }

        User user = userRepo.findByEmail(savedToken.getUser().getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnable(true);
        userRepo.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepo.save(savedToken);
    }
}

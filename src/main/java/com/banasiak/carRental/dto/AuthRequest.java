package com.banasiak.carRental.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


public record AuthRequest(


    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Not valid email format")
    String email,

    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @NotBlank(message = "Password is mandatory")
    String password

){
}

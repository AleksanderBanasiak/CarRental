package com.banasiak.carRental.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CarRequest(


        Long id,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String brand,

        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String model,

        @Min(value = 1, message = "102")
        int horsepower,

        @Min(value = 1, message = "103")
        int yearOfProduction,

        boolean shareable
) {
}

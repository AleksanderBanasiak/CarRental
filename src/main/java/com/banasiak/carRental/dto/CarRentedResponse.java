package com.banasiak.carRental.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarRentedResponse {

    private Long id;
    private String brand;
    private String model;
    private int horsepower;
    private int yearOfProduction;
    private double rate;
    private boolean returned;
    private boolean returnApproved;


}

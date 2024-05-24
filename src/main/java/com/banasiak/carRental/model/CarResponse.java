package com.banasiak.carRental.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarResponse {

    private Long id;
    private String brand;
    private String model;
    private byte[] carImg;
    private int horsepower;
    private int yearOfProduction;
    private String owner;
    private boolean archived;
    private boolean shareable;
    private double rate;





}

package com.banasiak.carRental.model;

import com.banasiak.carRental.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cars")
public class Car extends BaseEntity {

    private String brand;
    private String model;
    private String carImg;
    private int horsepower;
    private int yearOfProduction;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "car")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "car")
    private List<CarTransactionHistory> carTransactionHistories;

    @Transient
    public double getRate(){
        if(feedbacks == null || feedbacks.isEmpty()){
            return  0;
        }
        var rate = feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0);
        return Math.round(rate * 10.0)/10.0;

    }

}

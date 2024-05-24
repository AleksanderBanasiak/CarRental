package com.banasiak.carRental.model;

import com.banasiak.carRental.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "feedbacks")
public class Feedback extends BaseEntity {

    private double note;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
}

package com.banasiak.carRental.dto;

import com.banasiak.carRental.model.Car;
import org.springframework.data.jpa.domain.Specification;

public class CarSpecification {

    public static Specification<Car> withOwnedId(Long ownedId){
        return (((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownedId)));
    }


}

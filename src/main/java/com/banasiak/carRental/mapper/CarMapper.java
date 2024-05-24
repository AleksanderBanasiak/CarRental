package com.banasiak.carRental.mapper;

import com.banasiak.carRental.dto.CarRentedResponse;
import com.banasiak.carRental.dto.CarRequest;
import com.banasiak.carRental.model.Car;
import com.banasiak.carRental.model.CarResponse;
import com.banasiak.carRental.model.CarTransactionHistory;
import com.banasiak.carRental.utils.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class CarMapper {


    public Car mapCarRequestToCar(CarRequest carRequest){

        return Car.builder()
                .brand(carRequest.brand())
                .model(carRequest.model())
                .horsepower(carRequest.horsepower())
                .yearOfProduction(carRequest.yearOfProduction())
                .archived(false)
                .shareable(carRequest.shareable())
                .build();
    }

    public CarResponse mapCarToCarResponse(Car car) {
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .carImg(FileUtils.readFileFromLocation(car.getCarImg()))
                .model(car.getModel())
                .horsepower(car.getHorsepower())
                .yearOfProduction(car.getYearOfProduction())
                .archived(car.isArchived())
                .shareable(car.isShareable())
                .owner(car.getOwner().getName())
                .rate(car.getRate())
                .build();
    }

    public CarRentedResponse mapCarTransationHistoryToCarRentedResponse(CarTransactionHistory carTransactionHistory) {
        return CarRentedResponse.builder()
                .id(carTransactionHistory.getCar().getId())
                .brand(carTransactionHistory.getCar().getBrand())
                .model(carTransactionHistory.getCar().getModel())
                .horsepower(carTransactionHistory.getCar().getHorsepower())
                .yearOfProduction(carTransactionHistory.getCar().getYearOfProduction())
                .rate(carTransactionHistory.getCar().getRate())
                .returned(carTransactionHistory.isReturned())
                .returnApproved(carTransactionHistory.isReturnApproved())
                .build();
    }
}

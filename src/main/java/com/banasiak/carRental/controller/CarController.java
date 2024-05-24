package com.banasiak.carRental.controller;

import com.banasiak.carRental.common.PageResponse;
import com.banasiak.carRental.dto.CarRentedResponse;
import com.banasiak.carRental.dto.CarRequest;
import com.banasiak.carRental.model.CarResponse;
import com.banasiak.carRental.service.CarService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("car")
public class CarController {

    private final CarService carService;

    @PostMapping
    public ResponseEntity<Long> saveCar(@RequestBody @Valid CarRequest carRequest, Authentication authUser){
        return ResponseEntity.ok(carService.save(carRequest, authUser));
    }

    @GetMapping("{car_id}")
    public ResponseEntity<CarResponse> findCarById(@PathVariable("car_id") Long carId){
        return ResponseEntity.ok(carService.findCarById(carId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<CarResponse>> findAllCars(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authUser
    ){
        return ResponseEntity.ok(carService.findAllCars(page,size,authUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<CarResponse>> findAllOwnerCars(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authUser
    ){
        return ResponseEntity.ok(carService.findAllOwnerCars(page,size,authUser));
    }
    @GetMapping("/rented")
    public ResponseEntity<PageResponse<CarRentedResponse>> findAllRentedOwnerCars(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authUser
    ){
        return ResponseEntity.ok(carService.findAllRentedCars(page,size,authUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<CarRentedResponse>> findAllReturnedOwnerCars(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authUser
    ){
        return ResponseEntity.ok(carService.findAllReturnedCars(page,size,authUser));
    }


    @PatchMapping("/shareable/{car_id}")
    public ResponseEntity<Long> updateShareableStatus(@PathVariable("car_id") Long carId, Authentication authUser){
        return ResponseEntity.ok(carService.updateShareableStatus(carId, authUser));
    }


    @PatchMapping("/archived/{car_id}")
    public ResponseEntity<Long> updateArchivedStatus(@PathVariable("car_id") Long carId, Authentication authUser){
        return ResponseEntity.ok(carService.updateArchivedStatus(carId, authUser));
    }

    @PostMapping("/rent/{car_id}")
    public ResponseEntity<Long> rentCar(@PathVariable("car_id") Long carId, Authentication authUser){
       return ResponseEntity.ok(carService.rentCar(carId,authUser));
    }

    @PostMapping("/rent/return/{car_id}")
    public ResponseEntity<Long> returnCar(@PathVariable("car_id") Long carId, Authentication authUser){
      return ResponseEntity.ok(carService.returnCar(carId,authUser));
    }


    @PostMapping("/rent/return/approve/{car_id}")
    public ResponseEntity<Long> approveReturnedCar(@PathVariable("car_id") Long carId, Authentication authUser){
      return ResponseEntity.ok(carService.approveReturnedCar(carId,authUser));
    }

    @PostMapping(value = "/img/{car_id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCarImage(@PathVariable("car_id") Long carId, @Parameter()
                                            @RequestPart("file") MultipartFile file, Authentication authUser){
        carService.uploadCarImg(file, authUser, carId);
        return ResponseEntity.accepted().build();
    }


}

package com.banasiak.carRental.service;

import com.banasiak.carRental.common.PageResponse;
import com.banasiak.carRental.dto.CarRentedResponse;
import com.banasiak.carRental.dto.CarRequest;
import com.banasiak.carRental.dto.CarSpecification;
import com.banasiak.carRental.exception.OperationNotPermittedException;
import com.banasiak.carRental.mapper.CarMapper;
import com.banasiak.carRental.model.Car;
import com.banasiak.carRental.model.CarResponse;
import com.banasiak.carRental.model.CarTransactionHistory;
import com.banasiak.carRental.model.User;
import com.banasiak.carRental.repo.CarRepo;
import com.banasiak.carRental.repo.CarTransactionHistoryRepo;
import jakarta.mail.Multipart;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepo carRepo;
    private final CarMapper carMapper;
    private final CarTransactionHistoryRepo carTransactionHistoryRepo;
    private final FileStorageService fileStorageService;

    public Long save(CarRequest carRequest, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carMapper.mapCarRequestToCar(carRequest);
        car.setOwner(user);
        return carRepo.save(car).getId();
    }

    public CarResponse findCarById(Long carId) {
        return carRepo.findById(carId)
                .map(carMapper::mapCarToCarResponse)
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));
    }

    public PageResponse<CarResponse> findAllCars(int page, int size, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Car> cars = carRepo.findAllDisplayableCars(pageable, user.getId());
        List<CarResponse> carResponse = cars.stream()
                .map(carMapper::mapCarToCarResponse)
                .toList();
        return new PageResponse<>(
                carResponse,
                cars.getNumber(),
                cars.getSize(),
                cars.getTotalElements(),
                cars.getTotalPages(),
                cars.isFirst(),
                cars.isLast()
        );
    }

    public PageResponse<CarResponse> findAllOwnerCars(int page, int size, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Car> cars = carRepo.findAll(CarSpecification.withOwnedId(user.getId()), pageable);
        List<CarResponse> carResponse = cars.stream()
                .map(carMapper::mapCarToCarResponse)
                .toList();
        return new PageResponse<>(
                carResponse,
                cars.getNumber(),
                cars.getSize(),
                cars.getTotalElements(),
                cars.getTotalPages(),
                cars.isFirst(),
                cars.isLast()
        );
    }

    public PageResponse<CarRentedResponse> findAllRentedCars(int page, int size, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<CarTransactionHistory> cars = carTransactionHistoryRepo.findAllRentedCars(pageable, user.getId());
        List<CarRentedResponse> carResponse = cars.stream()
                .map(carMapper::mapCarTransationHistoryToCarRentedResponse)
                .toList();
        return new PageResponse<>(
                carResponse,
                cars.getNumber(),
                cars.getSize(),
                cars.getTotalElements(),
                cars.getTotalPages(),
                cars.isFirst(),
                cars.isLast()
        );
    }

    public PageResponse<CarRentedResponse> findAllReturnedCars(int page, int size, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<CarTransactionHistory> cars = carTransactionHistoryRepo.findAllReturnedCars(pageable, user.getId());
        List<CarRentedResponse> carResponse = cars.stream()
                .map(carMapper::mapCarTransationHistoryToCarRentedResponse)
                .toList();
        return new PageResponse<>(
                carResponse,
                cars.getNumber(),
                cars.getSize(),
                cars.getTotalElements(),
                cars.getTotalPages(),
                cars.isFirst(),
                cars.isLast()
        );
    }

    public Long updateShareableStatus(Long carId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        if(!Objects.equals(user.getId(), car.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot update car shareable status");
        }
        car.setShareable(!car.isShareable());
        return carRepo.save(car).getId();
    }

    public Long updateArchivedStatus(Long carId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        if(!Objects.equals(user.getId(), car.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot update car shareable status");
        }
        car.setArchived(!car.isArchived());
        return carRepo.save(car).getId();
    }



    public Long rentCar(Long carId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        if(car.isArchived() || !car.isShareable()){
            throw new OperationNotPermittedException("Car cannot be rented");
        }
        if(Objects.equals(user.getId(), car.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot rent your own car");
        }
        final boolean isAlreadyRented = carTransactionHistoryRepo.isAlreadyRented(carId, user.getId());
        if(isAlreadyRented){
            throw new OperationNotPermittedException("You cannot rent car because is already rented");
        }
        CarTransactionHistory carTransactionHistory = CarTransactionHistory.builder()
                .car(car)
                .user(user)
                .returnApproved(false)
                .returned(false)
                .build();
        return carTransactionHistoryRepo.save(carTransactionHistory).getId();
    }

    public Long returnCar(Long carId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        if(car.isArchived() || !car.isShareable()){
            throw new OperationNotPermittedException("Car cannot be returned");
        }
        if(Objects.equals(user.getId(), car.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot return your own car");
        }
        CarTransactionHistory carTransactionHistory = carTransactionHistoryRepo.findCarByIdAndUserId(carId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("You cannot return car"));
        carTransactionHistory.setReturned(true);
        return carTransactionHistoryRepo.save(carTransactionHistory).getId();
    }

    public Long approveReturnedCar(Long carId, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        if(car.isArchived() || !car.isShareable()){
            throw new OperationNotPermittedException("Car cannot be returned");
        }
        if(!Objects.equals(user.getId(), car.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot return your own car");
        }
        CarTransactionHistory carTransactionHistory = carTransactionHistoryRepo.findCarByIdAndOwnerId(carId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("The car is already returned"));
        carTransactionHistory.setReturnApproved(true);
        return carTransactionHistoryRepo.save(carTransactionHistory).getId();
    }

    public void uploadCarImg(MultipartFile file, Authentication authUser, Long carId) {
        Car car = carRepo.findById(carId).orElseThrow(() -> new EntityNotFoundException("Car not found"));
        User user = (User) authUser.getPrincipal();
        var carImg = fileStorageService.saveFile(file, user.getId());
        car.setCarImg(carImg);
        carRepo.save(car);
    }
}

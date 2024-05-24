package com.banasiak.carRental.repo;

import com.banasiak.carRental.model.CarTransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarTransactionHistoryRepo extends JpaRepository<CarTransactionHistory, Long> {


    @Query("""
            SELECT history From CarTransactionHistory history WHERE history.user.id = :userId
            """)
    Page<CarTransactionHistory> findAllRentedCars(Pageable pageable, Long userId);

    @Query("""
            SELECT history From CarTransactionHistory history WHERE history.car.owner.id = :userId
            """)
    Page<CarTransactionHistory> findAllReturnedCars(Pageable pageable, Long userId);


    @Query("""
            SELECT (COUNT(*) > 0) FROM CarTransactionHistory history WHERE history.car.id =:carId
             AND history.user.id =:userId AND history.returnApproved = false
            """)
    boolean isAlreadyRented(Long carId, Long userId);

    @Query("""
            SELECT history FROM CarTransactionHistory history WHERE history.car.id = :carId and
             history.user.id = :userId and history.returned = false
            """)
    Optional<CarTransactionHistory> findCarByIdAndUserId(Long carId, Long userId);

    @Query("""
            SELECT history FROM CarTransactionHistory history WHERE history.car.id = :carId and
             history.car.owner.id = :ownerId and history.returned = true and history.returnApproved = false
            """)
    Optional<CarTransactionHistory> findCarByIdAndOwnerId(Long carId, Long ownerId);
}

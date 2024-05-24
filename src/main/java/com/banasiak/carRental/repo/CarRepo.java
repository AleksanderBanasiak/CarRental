package com.banasiak.carRental.repo;

import com.banasiak.carRental.model.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepo extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {


    @Query("""
            SELECT car FROM Car car WHERE car.owner.id != :userId and car.shareable = true AND car.archived = false
            """)
    Page<Car> findAllDisplayableCars(Pageable pageable, Long userId);
}

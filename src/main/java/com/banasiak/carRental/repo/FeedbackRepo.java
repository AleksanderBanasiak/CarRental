package com.banasiak.carRental.repo;

import com.banasiak.carRental.model.Car;
import com.banasiak.carRental.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

    @Query("""
            SELECT feedback FROM Feedback feedback where feedback.car.id =:carId
            """)
    Page<Feedback> findAllFeedbackByCarId(Long carId, Pageable pageable);
}

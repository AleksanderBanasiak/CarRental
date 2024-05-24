package com.banasiak.carRental.service;

import com.banasiak.carRental.common.PageResponse;
import com.banasiak.carRental.dto.FeedbackRequest;
import com.banasiak.carRental.dto.FeedbackResponse;
import com.banasiak.carRental.exception.OperationNotPermittedException;
import com.banasiak.carRental.mapper.FeedbackMapper;
import com.banasiak.carRental.model.Car;
import com.banasiak.carRental.model.CarResponse;
import com.banasiak.carRental.model.Feedback;
import com.banasiak.carRental.model.User;
import com.banasiak.carRental.repo.CarRepo;
import com.banasiak.carRental.repo.FeedbackRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepo feedbackRepo;
    private final CarRepo carRepo;
    private final FeedbackMapper feedbackMapper;

    public Long save(FeedbackRequest request, Authentication authUser) {
        Car car = carRepo.findById(request.carId()).orElseThrow(() -> new EntityNotFoundException("Car not found"));

        if(car.isArchived() || !car.isShareable()){
            throw new OperationNotPermittedException("You cannot give feedback for this car");
        }
        User user = (User) authUser.getPrincipal();
        if(Objects.equals(user.getId(), car.getOwner().getId())){
           throw new OperationNotPermittedException("You cannot give feedback to your own car");
        }
        Feedback feedback = feedbackMapper.mapFeedbackRequestToFeedback(request);

        return feedbackRepo.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbackByCar(Long carId, int page, int size, Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("crateDate").descending());
        Page<Feedback> cars = feedbackRepo.findAllFeedbackByCarId(carId, pageable);
        List<FeedbackResponse> carResponses = cars.stream()
                .map(f -> feedbackMapper.mapFeedbackToFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                carResponses,
                cars.getNumber(),
                cars.getSize(),
                cars.getTotalElements(),
                cars.getTotalPages(),
                cars.isFirst(),
                cars.isLast()
        );

    }
}

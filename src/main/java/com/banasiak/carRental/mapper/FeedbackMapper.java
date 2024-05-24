package com.banasiak.carRental.mapper;

import com.banasiak.carRental.dto.FeedbackRequest;
import com.banasiak.carRental.dto.FeedbackResponse;
import com.banasiak.carRental.model.Car;
import com.banasiak.carRental.model.Feedback;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {
    public Feedback mapFeedbackRequestToFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .note(request.note())
                .comment(request.comment())
                .car(Car.builder()
                        .id(request.carId())
                        .build())
                .build();
    }


    public FeedbackResponse mapFeedbackToFeedbackResponse(Feedback feedback, Long userId) {
        return FeedbackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(userId, feedback.getCreatedBy()))
                .build();
    }
}

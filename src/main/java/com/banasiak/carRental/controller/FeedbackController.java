package com.banasiak.carRental.controller;

import com.banasiak.carRental.common.PageResponse;
import com.banasiak.carRental.dto.FeedbackRequest;
import com.banasiak.carRental.dto.FeedbackResponse;
import com.banasiak.carRental.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Long> saveFeedback(@RequestBody @Valid FeedbackRequest request, Authentication authUser){
        return ResponseEntity.ok(feedbackService.save(request, authUser));
    }

    @GetMapping("/car/{car_id}")
    public ResponseEntity<PageResponse<FeedbackResponse>> findAllFeedbackByCar(
            @PathVariable("car_id") Long carId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authUser
    ){
       return ResponseEntity.ok(feedbackService.findAllFeedbackByCar(carId, page, size, authUser));
    }


}

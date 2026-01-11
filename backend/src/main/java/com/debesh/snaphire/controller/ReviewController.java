package com.debesh.snaphire.controller;

import com.debesh.snaphire.entity.Review;
import com.debesh.snaphire.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies/{companyId}/reviews")
public class ReviewController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewController.class);

    @Autowired
    ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable Long companyId) {
        LOGGER.info("Fetching all reviews for company id: {}", companyId);
        List<Review> reviews = reviewService.getAllReviews(companyId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createReview(@PathVariable Long companyId, @RequestBody Review review) {
        LOGGER.info("Creating review for company id {}: {}", companyId, review);
        reviewService.createReview(companyId, review);
        return new ResponseEntity<>("Review created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long companyId, @PathVariable Long reviewId) {
        LOGGER.info("Fetching review id {} for company id: {}", reviewId, companyId);
        Review review = reviewService.getReviewById(companyId, reviewId);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable Long companyId, @PathVariable Long reviewId, @RequestBody Review review) {
        LOGGER.info("Updating review id {} for company id {}: {}", reviewId, companyId, review);
        review.setId(reviewId);
        reviewService.updateReview(companyId, review);
        return new ResponseEntity<>("Review updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReviewById(@PathVariable Long companyId, @PathVariable Long reviewId) {
        LOGGER.info("Deleting review id {} for company id: {}", reviewId, companyId);
        reviewService.deleteReviewById(companyId, reviewId);
        return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
    }
}

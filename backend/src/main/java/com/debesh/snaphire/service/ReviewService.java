package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Review;

import java.util.List;

public interface ReviewService {
    boolean createReview(Long companyId, Review review);

    boolean deleteReviewById(Long companyId, Long id);

    List<Review> getAllReviews(Long companyId);

    Review getReviewById(Long companyId, Long ReviewId);

    boolean updateReview(Long companyId, Review review);

}

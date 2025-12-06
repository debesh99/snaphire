package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.Exception.ReviewNotFoundException;
import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.entity.Review;
import com.debesh.snaphire.repository.ReviewRepository;
import com.debesh.snaphire.service.CompanyService;
import com.debesh.snaphire.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    CompanyService companyService;

    @Override
    public boolean createReview(Long companyId, Review review) {
        Company company = companyService.getCompanyById(companyId);
        review.setCompany(company);
        reviewRepository.save(review);
        return true;
    }

    @Override
    public boolean deleteReviewById(Long companyId, Long id) {
        companyService.getCompanyById(companyId);
        Review review = findReviewById(id);
        verifyReviewBelongsToCompany(review, companyId);
        reviewRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Review> getAllReviews(Long companyId) {
        companyService.getCompanyById(companyId);
        return reviewRepository.findByCompanyId(companyId);
    }

    @Override
    public Review getReviewById(Long companyId, Long reviewId) {
        companyService.getCompanyById(companyId);
        Review review = findReviewById(reviewId);
        verifyReviewBelongsToCompany(review, companyId);
        return review;
    }

    @Override
    public boolean updateReview(Long companyId, Review review) {
        companyService.getCompanyById(companyId);
        Review existingReview = findReviewById(review.getId());
        verifyReviewBelongsToCompany(existingReview, companyId);
        existingReview.setTitle(review.getTitle());
        existingReview.setDescription(review.getDescription());
        existingReview.setRating(review.getRating());
        reviewRepository.save(existingReview);
        return true;
    }

    private Review findReviewById(Long reviewId) throws ReviewNotFoundException {
        return reviewRepository.findById(reviewId).orElseThrow(() ->
                new ReviewNotFoundException("Review with id " + reviewId + " not found"));
    }

    private void verifyReviewBelongsToCompany(Review review, Long companyId) throws ReviewNotFoundException {
        if (review.getCompany().getId() != companyId) {
            throw new ReviewNotFoundException(
                    "Review with id " + review.getId() + " does not belong to company with id " + companyId);
        }
    }
}

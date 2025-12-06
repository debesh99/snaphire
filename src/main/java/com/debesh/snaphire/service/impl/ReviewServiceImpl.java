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
        if (company != null) {
            review.setCompany(company);
            reviewRepository.save(review);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteReviewById(Long companyId, Long id) {
        return false;
    }

    @Override
    public List<Review> getAllReviews(Long companyId) {
        return reviewRepository.findByCompanyId(companyId);
    }

    @Override
    public Review getReviewById(Long companyId, Long reviewId) {
        // Verify company exists
        Company company = companyService.getCompanyById(companyId);

        // Find review and verify it exists and belongs to the company
        Review review = reviewRepository.findById(reviewId).orElseThrow(() ->
                new ReviewNotFoundException("Review with id " + reviewId + " not found"));
        
        // Verify review belongs to the specified company
        if (review.getCompany().getId() != companyId) {
            throw new ReviewNotFoundException(
                "Review with id " + reviewId + " does not belong to company with id " + companyId);
        }
        
        return review;
    }

    @Override
    public boolean updateReview(Long companyId, Review review) {
        return false;
    }
}

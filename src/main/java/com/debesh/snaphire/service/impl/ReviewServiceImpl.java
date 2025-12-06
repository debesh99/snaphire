package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.entity.Review;
import com.debesh.snaphire.repository.ReviewRepository;
import com.debesh.snaphire.service.CompanyService;
import com.debesh.snaphire.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

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
        Company company = companyService.getCompanyById(companyId);
        if (company != null) {
            Review review = reviewRepository.findById(reviewId).orElse(null);
            if (review != null) {
                return review;
            }
        }
        return null;
    }

    @Override
    public boolean updateReview(Long companyId, Review review) {
        return false;
    }
}

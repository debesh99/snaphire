package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Application;

import java.util.List;

public interface ApplicationService {
    // Main action: Candidate applies for a job
    void applyForJob(Long userId, Long jobId);

    // Main action: Recruiter views applicants
    List<Application> getApplicationsByJobId(Long jobId);

    Application getApplicationById(Long id);

    List<Application> getAllApplications();

    void deleteApplication(Long id);
}

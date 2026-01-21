package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.exception.ApplicationNotFoundException;
import com.debesh.snaphire.exception.JobNotFoundException;
import com.debesh.snaphire.exception.UserNotFoundException;
import com.debesh.snaphire.entity.Application;
import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.entity.User;
import com.debesh.snaphire.repository.ApplicationRepository;
import com.debesh.snaphire.repository.JobRepository;
import com.debesh.snaphire.repository.UserRepository;
import com.debesh.snaphire.service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationServiceImpl.class);

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void applyForJob(Long userId, Long jobId) {
//        Check if already applied
        if (applicationRepository.existsByJobIdAndCandidateId(jobId, userId)) {
            LOGGER.error("Application failed. User {} already applied for Job {}", userId, jobId);
            throw new ApplicationNotFoundException("You have already applied for this job!");
        }
//        Check userID/Candidate
        User candidate = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
//        Check JobID
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobNotFoundException("Job not found"));

        Application application = new Application();
        application.setCandidate(candidate);
        application.setJob(job);

        applicationRepository.save(application);
    }

    @Override
    public List<Application> getApplicationsByJobId(Long jobId) {
        if (!jobRepository.existsById(jobId)) {
            throw new JobNotFoundException("Job not found");
        }
        return applicationRepository.findByJobId(jobId);
    }

    @Override
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application with ID " + id + " not found"));
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public void deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new ApplicationNotFoundException("Cannot delete. Application not found");
        }
        applicationRepository.deleteById(id);
        LOGGER.info("Application ID {} deleted", id);
    }

    @Override
    public void updateApplicationStatus(Long id, String status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found"));

        app.setStatus(status);
        applicationRepository.save(app);
    }
}

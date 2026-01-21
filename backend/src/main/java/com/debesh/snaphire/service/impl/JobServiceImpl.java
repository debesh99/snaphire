package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.exception.JobNotFoundException;
import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.repository.JobRepository;
import com.debesh.snaphire.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    private static final Logger LOGGER = LoggerFactory.getLogger(JobServiceImpl.class);
    @Autowired
    JobRepository jobRepository;

    @Override
    public void createJob(Job job) {
        jobRepository.save(job);
        LOGGER.info("Job created successfully with ID: {}", job.getId());
    }

    @Override
    public Job getJobById(Long id) throws JobNotFoundException {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job with ID " + id + " not found"));
    }

    @Override
    public void deleteJobById(Long id) {
        boolean isPresent = jobRepository.existsById(id);
        if (isPresent) {
            jobRepository.deleteById(id);
            LOGGER.info("Job with ID {} deleted successfully", id);
            return;
        }
        throw new JobNotFoundException("Job with ID " + id + " not found");
    }

    @Override
    public void updateJob(Long id, Job updatedJob) throws JobNotFoundException {
        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job with ID " + id + " not found"));
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setExperienceRequired(updatedJob.getExperienceRequired());
        jobRepository.save(existingJob);
        LOGGER.info("Job with ID {} updated successfully", id);
    }


    @Override
    public List<Job> findAllJobs() {
        return jobRepository.findAll();
    }

}

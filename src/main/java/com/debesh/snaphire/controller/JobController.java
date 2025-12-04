package com.debesh.snaphire.controller;

import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobController {

    private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);

    @Autowired
    JobService jobService;

    @PostMapping("/jobs")
    public ResponseEntity<?> createJob(@RequestBody Job job) {
        LOGGER.info("Creating job: {}", job);
        jobService.createJob(job);
        return new ResponseEntity<>("Job is created", HttpStatus.CREATED);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<?> getJobById(@PathVariable long id) {
        LOGGER.info("Fetching job by id: {}", id);
        Job job = jobService.getJobById(id);
        if (job == null) {
            LOGGER.warn("Job not found for id: {}", id);
            return new ResponseEntity<>("Job not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJobById(@PathVariable long id) {
        LOGGER.info("Deleting job by id: {}", id);
        try {
            boolean deleted = jobService.deleteJobById(id);
            if (deleted) {
                return new ResponseEntity<>("Job deleted", HttpStatus.OK);
            } else {
                LOGGER.error("Job not found");
                return new ResponseEntity<>("Job not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            LOGGER.error("Exception deleting job by id {}: {}", id, e.getMessage());
            return new ResponseEntity<>("Error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<?> updateJob(@PathVariable long id, @RequestBody Job updatedJob) {
        LOGGER.info("Updating job id {}: {}", id, updatedJob);
        boolean updated = jobService.updateJob(id, updatedJob);
        if (updated) {
            return new ResponseEntity<>("Job updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Job not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> findAll() {
        LOGGER.info("Getting all jobs");
        List<Job> jobs = jobService.findAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
}

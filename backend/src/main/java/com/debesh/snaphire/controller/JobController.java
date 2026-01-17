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
@RequestMapping("/jobs")
public class JobController {

    private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);
//    All the errors are handled by GlobalExceptionHandler.class, no need to mention it explicitly
    @Autowired
    JobService jobService;

    @PostMapping
    public ResponseEntity<String> createJob(@RequestBody Job job) {
        LOGGER.info("Creating job: {}", job);
        jobService.createJob(job);
        return new ResponseEntity<>("Job created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable("id") Long id) {
        LOGGER.info("Fetching job by id: {}", id);
        Job job = jobService.getJobById(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJobById(@PathVariable("id") Long id) {
        LOGGER.info("Deleting job by id: {}", id);
        jobService.deleteJobById(id);
        return new ResponseEntity<>("Job deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable("id") Long id, @RequestBody Job updatedJob) {
        LOGGER.info("Updating job id {}: {}", id, updatedJob);
        jobService.updateJob(id, updatedJob);
        return new ResponseEntity<>("Job updated successfully", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Job>> findAll() {
        LOGGER.info("Getting all jobs");
        List<Job> jobs = jobService.findAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
}

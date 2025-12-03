package com.debesh.snaphire.controller;

import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobController {

    private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);

    @Autowired
    JobService jobService;

    @PostMapping("/jobs")
    public ResponseEntity<?> createJob(@RequestBody Job job){
        LOGGER.info("Creating account: {}", job.toString());
        jobService.createJob(job);
        return new ResponseEntity<>("Job is created", HttpStatus.CREATED);
    }
}

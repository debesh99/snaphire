package com.debesh.snaphire.service;

import com.debesh.snaphire.exception.JobNotFoundException;
import com.debesh.snaphire.entity.Job;

import java.util.List;

public interface JobService {
    void createJob(Job job);

    Job getJobById(Long id) throws JobNotFoundException;

    void deleteJobById(Long id) throws JobNotFoundException;

    void updateJob(Long id, Job updatedJob) throws JobNotFoundException;

    List<Job> findAllJobs();
}

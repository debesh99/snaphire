package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Job;

import java.util.List;

public interface JobService {
    void createJob(Job job);

    Job getJobById(long id);

    boolean deleteJobById(long id);

    boolean updateJob(long id, Job updatedJob);

    List<Job> findAllJobs();
}

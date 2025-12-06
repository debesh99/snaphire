package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Job;

import java.util.List;

public interface JobService {
    boolean createJob(Job job) throws Exception;

    Job getJobById(long id);

    boolean deleteJobById(long id);

    boolean updateJob(long id, Job updatedJob);

    List<Job> findAllJobs();
}

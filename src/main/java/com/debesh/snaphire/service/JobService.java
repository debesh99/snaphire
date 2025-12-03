package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Job;

public interface JobService {
    void createJob(Job job);
    Job getJobById(long id);
    boolean deleteJobById(long id) throws Exception;
    boolean updateJob(long id, Job updatedJob);
}

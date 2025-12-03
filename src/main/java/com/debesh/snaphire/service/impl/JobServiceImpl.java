package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.repository.JobRepository;
import com.debesh.snaphire.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    JobRepository jobRepository;

    @Override
    public void createJob(Job job) {
        jobRepository.save(job);
    }

    @Override
    public Job getJobById(long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteJobById(long id) throws Exception {
        try {
            jobRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception("Job id not found for delete operation");
        }
    }

    @Override
    public boolean updateJob(long id, Job updatedJob) {
        Optional<Job> jobId = jobRepository.findById(id);
        if (jobId.isPresent()) {
            jobRepository.save(updatedJob);
            return true;
        }
        return false;
    }

    @Override
    public List<Job> findAllJobs() {
        return jobRepository.findAll();
    }

}

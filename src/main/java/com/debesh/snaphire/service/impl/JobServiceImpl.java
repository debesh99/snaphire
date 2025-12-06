package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.entity.Job;
import com.debesh.snaphire.repository.CompanyRepository;
import com.debesh.snaphire.repository.JobRepository;
import com.debesh.snaphire.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    private static final Logger LOGGER = LoggerFactory.getLogger(JobServiceImpl.class);
    @Autowired
    JobRepository jobRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public boolean createJob(Job job) throws Exception {
        Optional<Company> company = companyRepository.findById(job.getCompany().getId());
        if(company.isPresent()){
            jobRepository.save(job);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public Job getJobById(long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteJobById(long id){
        boolean isPresent = jobRepository.existsById(id);
        if(isPresent){
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateJob(long id, Job updatedJob) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        if (jobOptional.isPresent()) {
            Job existingJob = jobOptional.get();
            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setMinSalary(updatedJob.getMinSalary());
            existingJob.setMaxSalary(updatedJob.getMaxSalary());
            jobRepository.save(existingJob);
            return true;
        }
        return false;
    }

    @Override
    public List<Job> findAllJobs() {
        return jobRepository.findAll();
    }

}

package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.Exception.CompanyNotFoundException;
import com.debesh.snaphire.Exception.JobNotFoundException;
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
    public void createJob(Job job) throws CompanyNotFoundException {
        Optional<Company> company = companyRepository.findById(job.getCompany().getId());
        if (company.isPresent()) {
            jobRepository.save(job);
        } else {
            throw new CompanyNotFoundException("Company doesn't exist");
        }
    }

    @Override
    public Job getJobById(Long id) throws JobNotFoundException {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));
    }

    @Override
    public boolean deleteJobById(Long id) {
        boolean isPresent = jobRepository.existsById(id);
        if (isPresent) {
            jobRepository.deleteById(id);
            return true;
        }
        throw new JobNotFoundException("Job not found");
    }

    @Override
    public void updateJob(Long id, Job updatedJob) throws JobNotFoundException {
        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setMinSalary(updatedJob.getMinSalary());
        existingJob.setMaxSalary(updatedJob.getMaxSalary());
        jobRepository.save(existingJob);
    }


@Override
public List<Job> findAllJobs() {
    return jobRepository.findAll();
}

}

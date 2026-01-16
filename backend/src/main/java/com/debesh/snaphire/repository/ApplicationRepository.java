package com.debesh.snaphire.repository;

import com.debesh.snaphire.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // Finds all applications linked to a specific Job ID
    List<Application> findByJobId(Long jobId);

    // Optional: Check if a user has already applied to prevent duplicates
    boolean existsByJobIdAndCandidateId(Long jobId, Long candidateId);
}

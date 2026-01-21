package com.debesh.snaphire.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime appliedAt = LocalDateTime.now();

    // NEW: Status Field (Default to "Pending")
    private String status = "Pending";

    @ManyToOne
    @JoinColumn(name="job_id")
    // Keep JsonIgnoreProperties here to avoid circular loops if Job has list of applications
    @JsonIgnoreProperties({"applications", "hibernateLazyInitializer", "handler"})
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    // FIX: Removed @JsonIgnore
    // ADDED: @JsonIgnoreProperties to hide password and prevent circular loop
    @JsonIgnoreProperties({"password", "role", "applications", "hibernateLazyInitializer", "handler"})
    private User candidate;

    public Application(LocalDateTime appliedAt, Job job, User candidate, String status) {
        this.appliedAt = appliedAt;
        this.job = job;
        this.candidate = candidate;
        this.status = status;
    }

    public Application(){}

    // ... Getters and Setters ...

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getCandidate() { return candidate; }
    public void setCandidate(User candidate) { this.candidate = candidate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
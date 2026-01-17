package com.debesh.snaphire.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime appliedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name="job_id")
    @JsonIgnore
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User candidate;

    public Application(LocalDateTime appliedAt, Job job, User candidate) {
        this.appliedAt = appliedAt;
        this.job = job;
        this.candidate = candidate;
    }

    public Application(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public User getCandidate() {
        return candidate;
    }

    public void setCandidate(User candidate) {
        this.candidate = candidate;
    }

    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", appliedAt=" + appliedAt +
                ", jobId=" + (job != null ? job.getId() : "null") + // Print ID only
                ", candidateId=" + (candidate != null ? candidate.getId() : "null") + // Print ID only
                '}';
    }
}

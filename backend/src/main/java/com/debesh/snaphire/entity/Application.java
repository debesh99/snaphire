package com.debesh.snaphire.entity;

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
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
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
        return "Candidate{" +
                "id=" + id +
                ", appliedAt=" + appliedAt +
                ", job=" + job +
                ", candidate=" + candidate +
                '}';
    }
}

package com.debesh.snaphire.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String company;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String location;
    private int experienceRequired;

    // --- CORRECTED RELATIONSHIP ---
    // 1. Must be a List (One Job -> Many Applications)
    // 2. 'mappedBy = "job"' means the Foreign Key is in the Application table
    // 3. Cascade ALL: If you delete a Job, delete all its Applications too.
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications;

    public Job(Long id, String company, String title, String description, String location, int experienceRequired, List<Application> applications) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.description = description;
        this.location = location;
        this.experienceRequired = experienceRequired;
        this.applications = applications;
    }

    public Job() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getExperienceRequired() {
        return experienceRequired;
    }

    public void setExperienceRequired(int experienceRequired) {
        this.experienceRequired = experienceRequired;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", company='" + company + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", experienceRequired=" + experienceRequired +
                '}';
    }
}

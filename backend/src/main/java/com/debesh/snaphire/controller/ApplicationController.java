package com.debesh.snaphire.controller;

import com.debesh.snaphire.entity.Application;
import com.debesh.snaphire.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    // POST: /applications/apply?userId=1&jobId=5
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestParam Long userId, @RequestParam Long jobId) {
        applicationService.applyForJob(userId, jobId);
        return new ResponseEntity<>("Application created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJobId(jobId));
    }

    // GET: /applications/1 (Get details of a single application)
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    // DELETE: /applications/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok("Application withdrawn/deleted successfully");
    }
}

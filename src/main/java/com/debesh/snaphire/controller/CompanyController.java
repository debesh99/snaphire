package com.debesh.snaphire.controller;

import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        LOGGER.info("Fetching all companies");
        List<Company> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable long id) {
        LOGGER.info("Fetching company by id: {}", id);
        Company company = companyService.getCompanyById(id);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createCompany(@RequestBody Company company) {
        LOGGER.info("Creating company: {}", company);
        companyService.createCompany(company);
        return new ResponseEntity<>("Company created", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCompany(@PathVariable long id, @RequestBody Company updatedCompany) {
        LOGGER.info("Updating company id {}: {}", id, updatedCompany);
        companyService.updateCompany(id, updatedCompany);
        return new ResponseEntity<>("Company updated", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable long id) {
        LOGGER.info("Deleting company by id: {}", id);
        companyService.deleteCompanyById(id);
        return new ResponseEntity<>("Company deleted", HttpStatus.OK);
    }
}

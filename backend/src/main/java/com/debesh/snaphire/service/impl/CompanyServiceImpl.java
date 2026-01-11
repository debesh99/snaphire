package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.Exception.CompanyNotFoundException;
import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.repository.CompanyRepository;
import com.debesh.snaphire.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public void createCompany(Company company) {
        companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(long id) throws CompanyNotFoundException {
        return companyRepository.findById(id).orElseThrow(() -> new CompanyNotFoundException("Company doesn't exist"));
    }

    @Override
    public void updateCompany(long id, Company updatedCompany) {
        Company existingCompany = companyRepository.findById(id).orElseThrow(() -> new CompanyNotFoundException("Company doesn't exist"));
        existingCompany.setName(updatedCompany.getName());
        existingCompany.setDescription(updatedCompany.getDescription());
        companyRepository.save(existingCompany);
    }

    @Override
    public void deleteCompanyById(long id) {
        Company existingCompany = companyRepository.findById(id).orElseThrow(() -> new CompanyNotFoundException("Company doesn't exist"));
        companyRepository.deleteById(id);
    }
}

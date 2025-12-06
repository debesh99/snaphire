package com.debesh.snaphire.service.impl;

import com.debesh.snaphire.Exception.CompanyNotFoundException;
import com.debesh.snaphire.entity.Company;
import com.debesh.snaphire.repository.CompanyRepository;
import com.debesh.snaphire.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Company getCompanyById(long id) {
        return companyRepository.findById(id).orElseThrow(()->new CompanyNotFoundException("Company doesn't exist"));
    }

    @Override
    public boolean updateCompany(long id, Company updatedCompany) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isPresent()) {
            Company existingCompany = companyOptional.get();
            existingCompany.setName(updatedCompany.getName());
            existingCompany.setDescription(updatedCompany.getDescription());
            companyRepository.save(existingCompany);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCompanyById(long id) {
        Optional<Company> companyOpt = companyRepository.findById(id);
        if(companyOpt.isPresent()){
            companyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

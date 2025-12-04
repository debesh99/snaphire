package com.debesh.snaphire.service;

import com.debesh.snaphire.entity.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAllCompanies();

    void createCompany(Company company);

    Company getCompanyById(long id);

    boolean updateCompany(long id, Company updatedCompany);

    boolean deleteCompanyById(long id);
}

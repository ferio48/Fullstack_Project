package com.pranav.fullstack_backend.service.impl;

import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.dao.EmployeeRepository;
import com.pranav.fullstack_backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public String validateCreds(String username, String password) {
//        employeeRepository.findByEmailAndPassword(username, password);
        return null;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        return employeeList;
    }
}

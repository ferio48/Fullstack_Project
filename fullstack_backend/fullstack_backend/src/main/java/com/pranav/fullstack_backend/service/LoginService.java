package com.pranav.fullstack_backend.service;

import com.pranav.fullstack_backend.model.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

public interface LoginService {
    String validateCreds(String username, String password);

    List<Employee> getAllEmployees();
}

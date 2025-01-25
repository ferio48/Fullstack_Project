package com.pranav.fullstack_backend.service;

import com.pranav.fullstack_backend.auth.RegisterRequest;
import com.pranav.fullstack_backend.response.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    List<EmployeeResponse> getEmployeeResp();

    void deleteEmployee(Integer empId);

    EmployeeResponse updateEmployee(RegisterRequest registerRequest, Integer empId);
}

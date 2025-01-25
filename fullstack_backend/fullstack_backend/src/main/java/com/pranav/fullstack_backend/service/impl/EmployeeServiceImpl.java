package com.pranav.fullstack_backend.service.impl;

import com.pranav.fullstack_backend.auth.RegisterRequest;
import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.response.EmployeeResponse;
import com.pranav.fullstack_backend.dao.EmployeeRepository;
import com.pranav.fullstack_backend.service.EmployeeService;
import com.pranav.fullstack_backend.service.LoginService;
import com.pranav.fullstack_backend.model.Token;
import com.pranav.fullstack_backend.dao.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private LoginService loginService;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeResponse> getEmployeeResp() {
        List<Employee> employeeList = loginService.getAllEmployees();
        return employeeList.stream().map(this::mapToEmployeeResp).collect(Collectors.toList());
    }

    /**
     *
     * @param empId
     * @return
     */
    @Override
    public void deleteEmployee(Integer empId) {
        List<Token> tokens = tokenRepository.findAllTokensByEmployee(empId);
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new UsernameNotFoundException("Employee Not Found!!!"));
        tokenRepository.deleteAll(tokens);
        employeeRepository.delete(employee);
    }

    @Override
    public EmployeeResponse updateEmployee(RegisterRequest registerRequest, Integer empId) {
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new UsernameNotFoundException("Employee NOT FOUND!!!"));

        if(registerRequest.getCompany() != null
                && !registerRequest.getCompany().equals(employee.getCompany())) employee.setCompany(registerRequest.getCompany());
        if(registerRequest.getDob() != null
                && !registerRequest.getDob().equals(employee.getDob())) employee.setDob(registerRequest.getDob());
        if(registerRequest.getFirstname() != null
                && !registerRequest.getFirstname().equals(employee.getFirstname())) employee.setFirstname(registerRequest.getFirstname());
        if(registerRequest.getLastname() != null
                && !registerRequest.getLastname().equals(employee.getLastname())) employee.setLastname(registerRequest.getLastname());
        if(registerRequest.getExperience() != null
                && !registerRequest.getExperience().equals(employee.getExperience())) employee.setExperience(registerRequest.getExperience());
        if(registerRequest.getExpertise() != null
                && !registerRequest.getExpertise().equals(employee.getExpertise())) employee.setExpertise(registerRequest.getExpertise());
        if(registerRequest.getGender() != null
                && !registerRequest.getGender().equals(employee.getGender())) employee.setGender(registerRequest.getGender());

        employeeRepository.save(employee);

        return mapToEmployeeResp(employee);
    }

    private EmployeeResponse mapToEmployeeResp(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .dob(employee.getDob())
                .company(employee.getCompany())
                .email(employee.getEmail())
                .role(employee.getRole().toString())
                .experience(employee.getExperience())
                .expertise(employee.getExpertise())
                .firstname(employee.getFirstname())
                .gender(employee.getGender())
                .lastname(employee.getLastname())
                .build();
    }
}

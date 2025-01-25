package com.pranav.fullstack_backend.controller;

import com.pranav.fullstack_backend.model.Employee;
import com.pranav.fullstack_backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/login")
@CrossOrigin("*")
public class loginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/validateCreds")
    public String validateCreds(String username, String password) {
        return loginService.validateCreds(username, password);
    }

    @GetMapping("/getEmployees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employeeList = loginService.getAllEmployees();
        return ResponseEntity.ok(employeeList);
    }
}

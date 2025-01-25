package com.pranav.fullstack_backend.controller;

import com.pranav.fullstack_backend.auth.RegisterRequest;
import com.pranav.fullstack_backend.response.EmployeeResponse;
import com.pranav.fullstack_backend.service.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employee")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/getEmployeeResp")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployeeResp() {
        return ResponseEntity.ok(service.getEmployeeResp());
    }

//    @PostMapping("/saveEmployee")
//    public ResponseEntity<EmployeeResponse> saveEmployee(@RequestBody RegisterRequest )

    @DeleteMapping("/deleteEmployee/{id}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public void deleteEmployee(@PathVariable("id") Integer empId) {
        service.deleteEmployee(empId);
    }

//    @PreAuthorize("hasAuthority('admin:update')")
    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @RequestBody RegisterRequest registerRequest,
            @PathVariable("id") Integer empId
    ) {
        return ResponseEntity.ok(service.updateEmployee(registerRequest, empId));
    }

    /**
     * @// TODO: 09-02-2024  
     * @param request
     * @param response
     * @param authentication
     * @return
     */
    @GetMapping("/getEmpByToken")
    public ResponseEntity<EmployeeResponse> getEmpByToken(
            HttpServletRequest request, 
            HttpServletResponse response,
            Authentication authentication
    ) {
        return null;
    }
}

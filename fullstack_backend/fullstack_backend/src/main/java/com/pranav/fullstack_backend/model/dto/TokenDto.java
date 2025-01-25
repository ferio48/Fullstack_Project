package com.pranav.fullstack_backend.model.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pranav.fullstack_backend.enums.TokenType;
import com.pranav.fullstack_backend.model.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    private Integer id;
    private String token;
    private TokenType tokenType;
    private boolean expired;
    private boolean revoked;
    private EmployeeDto employeeDto;
}

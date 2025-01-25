package com.pranav.fullstack_backend.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.pranav.fullstack_backend.enums.Role;
import com.pranav.fullstack_backend.model.Token;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String expertise;
    private String dob;
    private String company;
    private Integer experience;
    private String gender;
    private Role role;
    private List<TokenDto> tokenDtoList;
}

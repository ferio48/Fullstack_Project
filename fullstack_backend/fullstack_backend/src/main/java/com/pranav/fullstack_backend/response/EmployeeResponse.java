package com.pranav.fullstack_backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String expertise;
    private String dob;
    private String company;
    private Integer experience;
    private String gender;
    private String role;
}

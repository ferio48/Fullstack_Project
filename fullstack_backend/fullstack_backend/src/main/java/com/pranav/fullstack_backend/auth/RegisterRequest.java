package com.pranav.fullstack_backend.auth;

import com.pranav.fullstack_backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String expertise;
    private String dob;
    private String company;
    private Integer experience;
    private Role role;
    private String gender;
}

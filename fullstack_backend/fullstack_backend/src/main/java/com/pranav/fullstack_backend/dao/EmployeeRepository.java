package com.pranav.fullstack_backend.dao;

import com.pranav.fullstack_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByEmail(String email);

    @Query("SELECT e from Employee e WHERE e.email = ?1 AND e.password = ?2")
    Optional<Employee> findByEmailAndPassword(String email, String password);
}
